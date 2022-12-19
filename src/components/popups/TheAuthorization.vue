<template>
  <div class="authorization popup-wrapper" v-show="view">
    <div class="wrapper">
      <the-close @close="close"></the-close>
      <the-switched
        @toggleText="toggleText"
        @toggleInput="toggleInput"
        :number="indexActive"
      >
        <template #first-title>{{ $t("logIn") }}</template>
        <template #second-title>{{ $t("signUp") }}</template>
      </the-switched>
      <form
        method="post"
        :action="`${
          indexActive === 0
            ? `${$t('entranceAction')}`
            : $t('registrationAction')
        }`"
        @submit.prevent="
          `${
            indexActive === 0 ? validate($event) : validateRegistration($event)
          }`
        "
      >
        <input type="hidden" :value="csrfToken" :name="csrfParam" />
        <div class="inputs">
          <template v-if="indexActive === 0">
            <the-field
              v-for="(input, idx) in entrance"
              :key="idx"
              :name-placeholder="input.placeholder"
              :data-idx="idx"
              :class="input.className"
              :name-type="input.type"
              :name-id="input.id"
              :name="input.name"
              :autocomplete="input.autocomplete"
              :show-error="input.error"
            >
              <template #label>{{ $t(`${input.label}`) }}</template>
              <template #icon>
                <span
                  class="show-password"
                  v-if="input.type === 'password'"
                  @click="viewPassword(idx)"
                >
                  <component is="icon-eye"></component>
                </span>
              </template>
            </the-field>
          </template>
          <template v-else>
            <the-field
              v-for="(input, idx) in registration"
              :key="idx"
              :data-idx="idx"
              :class="input.className"
              :name-placeholder="input.placeholder"
              :name-type="input.type"
              :name-id="input.id"
              :name="input.name"
              :autocomplete="input.autocomplete"
              :show-error="input.error"
              :required="input.required"
            >
              <template #label>{{ $t(`${input.label}`) }}</template>
              <template #icon>
                <span
                  class="show-password"
                  v-if="input.type === 'password'"
                  @click="viewPassword(idx)"
                >
                  <component is="icon-eye"></component>
                </span>
                <the-question-information
                  v-if="input.type === 'email'"
                ></the-question-information>
              </template>
            </the-field>
          </template>
        </div>

        <div class="captcha" v-show="indexActive === 1">
          <div class="g-recaptcha"></div>
        </div>
        <button @click="$emit('open')" v-if="indexActive === 0" class="forgot">
          {{ $t("remind") }}
        </button>
        <the-button tag="button">
          <template #name v-if="indexActive === 0">
            {{ $t("logIn") }}
          </template>
          <template #name v-else>
            {{ $t("signUp") }}
          </template>
        </the-button>
      </form>
    </div>
  </div>
</template>

<script>
import TheQuestionInformation from "../blocks/TheQuestionInformation.vue";
import TheClose from "../buttons/TheClose.vue";
import TheSwitched from "../buttons/TheSwitched.vue";
import TheButton from "../buttons/TheButton.vue";
import TheField from "../blocks/TheField.vue";
import IconEye from "../icons/IconEye.vue";
import axios from "axios";

let registration = [
  {
    label: "name",
    type: "text",
    id: "registration_name",
    name: "SignupForm[first_name]",
    required: true,
  },
  {
    label: "email",
    placeholder: "user@gmail.com",
    type: "email",
    id: "registration_mail",
    name: "SignupForm[email]",
    required: true,
  },
  {
    label: "password",
    placeholder: "••••••••••",
    type: "password",
    id: "registration_password",
    name: "SignupForm[password]",
    required: true,
    className: "password",
  },
  {
    label: "confirmPassword",
    placeholder: "••••••••••",
    type: "password",
    id: "registration_сonfirm_password",
    name: "SignupForm[сonfirm_password]",
    required: true,
    className: "password",
  },
  {
    label: "referralLink",
    type: "text",
    id: "registration_link",
    name: "SignupForm[referred_by]",
  },
];
let entrance = [
  {
    label: "email",
    placeholder: "user@gmail.com",
    type: "email",
    id: "entrance_mail",
    name: "LoginForm[email]",
  },
  {
    label: "password",
    placeholder: "•••••••••",
    type: "password",
    id: "entrance_password",
    name: "LoginForm[password]",
    className: "password",
    autocomplete: "off",
  },
];
export default {
  inject: ["isAuthorization"],
  name: "TheAuthorization",
  data() {
    return {
      registration,
      entrance,
      isShow: false,
      index: 0,
      csrfToken: null,
      csrfParam: null,
    };
  },
  components: {
    TheButton,
    TheSwitched,
    TheField,
    TheClose,
    IconEye,
    TheQuestionInformation,
  },
  computed: {
    view() {
      return (this.isShow = this.isAuthorization.isOpen);
    },
    indexActive() {
      return (this.index = this.isAuthorization.index);
    },
    getHost() {
      let windowHost = window.location.host;
      if (
        windowHost === "makeup.7money.co" ||
        windowHost === "7money.co" ||
        windowHost === "obmen.loc"
      ) {
        return "";
      }
      return "http://obmen.loc"; // 'http://proxy.local:8888'
    },
  },
  methods: {
    toggleInput() {
      if (this.isAuthorization.index === 0) {
        this.isAuthorization.index = 1;
      } else {
        this.isAuthorization.index = 0;
      }
    },
    toggleText(idx) {
      this.isAuthorization.index = idx;
    },
    close() {
      this.isAuthorization.isOpen = false;
    },
    validate(e) {
      let action = e.target.action;
      let formData = new FormData(e.target);
      console.log(formData);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
      };
      document.querySelectorAll(".help-block").forEach(function (el, i) {
        el.innerHTML = "";
      });
      axios.post(action, formData, config).then(function (response) {
        if (Object.keys(response.data).length) {
          let data = response.data;
          console.log(data);
          for (let k in data) {
            console.log(k);
            if (document.querySelector(".field-" + k)) {
              document.querySelector(".field-" + k).innerHTML = data[k][0];
            }
          }
        } else {
          e.target.submit();
        }
      });
    },
    viewPassword(idx) {
      let pas = document.querySelectorAll(".password");
      pas.forEach((item) => {
        if (item.getAttribute("data-idx") === String(idx)) {
          let inp = item.querySelector("input");
          if (inp.getAttribute("type") === "password") {
            inp.setAttribute("type", "text");
          } else {
            inp.setAttribute("type", "password");
          }
        }
      });
    },
    validateRegistration(e) {
      let action = e.target.action;
      let formData = new FormData(e.target);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
      };
      document.querySelectorAll(".help-block").forEach(function (el, i) {
        el.innerHTML = "";
      });
      axios.post(action, formData, config).then(function (response) {
        if (Object.keys(response.data).length) {
          let data = response.data;
          for (let k in data) {
            if (document.querySelector(".help-" + k)) {
              document.querySelector(".help-" + k).innerHTML = data[k][0];
            }
          }
        } else {
          e.target.submit();
        }
      });
    },
    getReferral() {
      let paramsString = window.location.search;
      let searchParams = new URLSearchParams(paramsString);
      if (searchParams.has("rid")) {
        let value;
        let name = "_rid";
        for (let rid of searchParams.entries()) {
          // name = rid[0];
          value = rid[1];
        }
        this.setCookie(name, value, 1);
      }
      this.getCookies();
    },
    setCookie(name, value, days, path = "/") {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        "; expires=" +
        expires +
        "; path=" +
        path;
    },
    getCookies() {
      let name = "_rid";
      if (document.cookie.length > 0) {
        let cookieStart = document.cookie.indexOf(name + "=");
        if (cookieStart !== -1) {
          cookieStart = cookieStart + name.length + 1;
          let cookieEnd = document.cookie.indexOf(";", cookieStart);
          if (cookieEnd === -1) {
            cookieEnd = document.cookie.length;
          }
          this.referralId = unescape(
            document.cookie.substring(cookieStart, cookieEnd)
          );
        }
      }
    },
  },
  mounted() {
    this.getReferral();
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.authorization {
  & .show-password {
    width: 22px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    position: absolute;
    right: 10px;
    color: var(--quaternary);
  }

  & .forgot {
    text-decoration: none;
  }

  & .wrapper {
    padding: 30px;
    overflow: hidden;
    background: var(--seventh);
  }

  & .switched {
    margin-bottom: 25px;

    & span {
      font-weight: 600;
      font-size: 24px;
    }
  }

  & .inputs {
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    margin-bottom: 18px;
  }

  & .button {
    margin-top: 20px;
    width: 100%;
  }
}

.captcha {
  padding: 12px 10px;
  border-radius: var(--radius-four);
  text-align: center;
  background: var(--secondary);

  .g-recaptcha {
    position: relative !important;
    overflow: auto !important;
    right: 0 !important;
    bottom: 0 !important;
    max-width: 302px !important;
    width: 100% !important;
    height: auto !important;
    background: #d3d3d3 !important;
    margin: 0 auto;

    & iframe {
      border: 0;
      width: 100%;
      height: 76px;
    }
  }
}
</style>