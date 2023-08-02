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
              :error-name="input.errorName"
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
              :error-name="input.errorName"
              :model-value="input.defaultValue"
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
        <button
          type="button"
          @click="$emit('open')"
          v-if="indexActive === 0"
          class="forgot"
        >
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
function getRid() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("rid") ?? null;
}
import TheQuestionInformation from "../blocks/TheQuestionInformation.vue";
import TheClose from "../buttons/TheClose.vue";
import TheSwitched from "../buttons/TheSwitched.vue";
import TheButton from "../buttons/TheButton.vue";
import TheField from "../blocks/TheField.vue";
import IconEye from "../icons/IconEye.vue";
import axios from "axios";
import { mapMutations } from "vuex";

let registration = [
  {
    label: "name",
    type: "text",
    id: "registration_name",
    name: "SignupForm[first_name]",
    errorName: "help-signupform-first_name",
    required: true,
  },
  {
    label: "email",
    placeholder: "user@gmail.com",
    type: "email",
    id: "registration_mail",
    name: "SignupForm[email]",
    errorName: "help-signupform-email",
    required: true,
  },
  {
    label: "password",
    placeholder: "••••••••••",
    type: "password",
    id: "registration_password",
    name: "SignupForm[password]",
    required: true,
    errorName: "help-signupform-password",
    className: "password",
  },
  {
    label: "confirmPassword",
    placeholder: "••••••••••",
    type: "password",
    id: "registration_confirm_password",
    name: "SignupForm[confirm_password]",
    errorName: "help-signupform-confirm_password",
    required: true,
    className: "password",
  },
  {
    label: "referralLink",
    type: "text",
    id: "registration_link",
    name: "SignupForm[referred_by]",
    errorName: "help-signupform-referred_by",
    defaultValue: getRid(),
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
    errorName: "help-loginform-password",
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
      if (this.isAuthorization.isOpen && this.index === 1) {
        const script = document.createElement("script");
        script.src = "//www.google.com/recaptcha/api.js?hl=ru";
        script.defer = true;
        document.body.append(script);
      }
      return (this.isShow = this.isAuthorization.isOpen);
    },
    indexActive() {
      return (this.index = this.isAuthorization.index);
    },
  },
  methods: {
    ...mapMutations(["viewPassword"]),
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
          let field = document.querySelectorAll(
            ".authorization .field .form-group"
          );
          for (let k in data) {
            field.forEach((item) => {
              if (
                document.querySelector(".help-" + k) &&
                item.querySelector(".help-" + k)
              ) {
                item.classList.add("has-error");
                document.querySelector(".help-" + k).innerHTML = data[k][0];
              }
            });
          }
        } else {
          e.target.submit();
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
          let field = document.querySelectorAll(
            ".authorization .field .form-group"
          );
          for (let k in data) {
            field.forEach((item) => {
              if (
                document.querySelector(".help-" + k) &&
                item.querySelector(".help-" + k)
              ) {
                item.classList.add("has-error");
                document.querySelector(".help-" + k).innerHTML = data[k][0];
              }
            });
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
  & .forgot {
    text-decoration: none;
  }

  & .wrapper {
    background: var(--seventh);
  }

  & .switched {
    margin-bottom: 25px;

    & span {
      font-weight: 500;
      font-size: 24px;
      @include _576 {
        font-size: 20px;
      }
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

.show-password {
  width: 22px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  position: absolute;
  right: 10px;
  color: var(--quaternary);
}
</style>
