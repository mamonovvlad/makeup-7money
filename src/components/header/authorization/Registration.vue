<template>
  <form
    class="registration"
    id="registration"
    :action="$t('registrationAction')"
    method="post"
    @submit.prevent="validateRegistration"
  >
    <input type="hidden" :value="csrfToken" :name="csrfParam" />
    <label class="text-copy-descr" for="registration_name"
      >{{ $t("name") }}*</label
    >
    <div class="input_block shadow_btn_white_active">
      <input
        id="registration_name"
        class="bg-background-main text-copy-descr"
        type="text"
        required
        name="SignupForm[first_name]"
      />
    </div>
    <p class="help-block help-signupform-first_name"></p>
    <label class="text-copy-descr" for="registration_mail">Email*</label>
    <div class="input_block shadow_btn_white_active">
      <input
        id="registration_mail"
        class="bg-background-main text-copy-descr"
        type="email"
        required
        name="SignupForm[email]"
      />
    </div>
    <p class="help-block help-signupform-email"></p>
    <label class="text-copy-descr" for="registration_password"
      >{{ $t("password") }}*</label
    >
    <div class="input_block shadow_btn_white_active">
      <input
        id="registration_password"
        class="bg-background-main text-copy-descr"
        type="password"
        required
        name="SignupForm[password]"
      />
    </div>
    <p class="help-block help-signupform-password"></p>
    <label class="text-copy-descr" for="registration_сonfirm_password"
      >{{ $t("сonfirmPassword") }}*</label
    >
    <div class="input_block shadow_btn_white_active">
      <input
        id="registration_сonfirm_password"
        class="bg-background-main text-copy-descr"
        type="password"
        required
        name="SignupForm[сonfirm_password]"
      />
    </div>
    <p class="help-block help-signupform-confirm_password"></p>
    <label class="text-copy-descr" for="registration_link">{{
      $t("referralID")
    }}</label>
    <div class="input_block shadow_btn_white_active">
      <input
        id="registration_link"
        class="bg-background-main text-copy-descr"
        type="text"
        name="SignupForm[referred_by]"
      />
    </div>
    <p class="help-block help-signupform-referred_by"></p>
    <div class="window_robot bg-background-descr">
      <div
        class="g-recaptcha"
        data-sitekey="6LcIdggUAAAAABRu2Ize9tt04x7hhkHh2KLRgoAf"
        data-lang="ru"
      ></div>
    </div>
    <button class="green_btn text-copy-btngreen form_btn" type="submit">
      {{ $t("signUp") }}
    </button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      csrfToken: null,
      csrfParam: null,
    };
  },
  methods: {
    validateRegistration(e) {
      let action = e.target.action;
      let formData = new FormData(e.target);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
      };
      document.querySelectorAll(".help-block").forEach(function(el, i) {
        el.innerHTML = "";
      });
      axios.post(action, formData, config).then(function(response) {
        if (Object.keys(response.data).length) {
          let data = response.data;
          for (var k in data) {
            if (document.querySelector(".help-" + k)) {
              document.querySelector(".help-" + k).innerHTML = data[k][0];
            }
          }
        } else {
          e.target.submit();
        }
      });
    },
  },
  computed: {
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
  mounted() {
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
  },
};
</script>
<style>
.grecaptcha-badge {
  position: relative !important;
  overflow: auto !important;
  right: 0 !important;
  bottom: 0 !important;
  max-width: 302px !important;
  width: 100% !important;
  height: auto !important;
  background: #d3d3d3 !important;
  margin: 0 auto;
}
#registration iframe {
  border: 0;
  width: 100%;
  height: 76px;
}
</style>
