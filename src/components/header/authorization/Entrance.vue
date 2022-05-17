<template>
  <form
    class="entrance"
    method="post"
    :action="$t('entranceAction')"
    @submit.prevent="validateLogin"
  >
    <input type="hidden" :value="csrfToken" :name="csrfParam" />
    <label class="text-copy-descr" for="entrance_mail">E-mail</label>
    <div class="input_block shadow_btn_white_active">
      <input
        id="entrance_mail"
        class="bg-background-main text-copy-descr"
        type="email"
        name="LoginForm[email]"
        placeholder="user@gmail.com"
      />
    </div>
    <p class="help-block help-loginform-email"></p>
    <label class="text-copy-descr" for="entrance_password">{{
      $t("password")
    }}</label>
    <div class="input_block shadow_btn_white_active">
      <input
        autocomplete="off"
        id="entrance_password"
        class="bg-background-main text-copy-descr"
        type="password"
        placeholder="***************"
        name="LoginForm[password]"
      />
      <button type="button" class="view" @click="viewPassword">
        <img src="/source/image/view.svg" alt="" v-show="hiddenPassword" />
        <img src="/source/image/private.svg" alt="" v-show="!hiddenPassword" />
      </button>
    </div>
    <p class="help-block help-loginform-password"></p>
    <a href="#" class="forgot" @click.prevent="open_password_recovery">{{
      $t("remind")
    }}</a>
    <button class="green_btn text-copy-btngreen form_btn" type="submit">
      {{ $t("logIn") }}
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
      hiddenPassword: true,
    };
  },
  methods: {
    viewPassword() {
      this.hiddenPassword = !this.hiddenPassword;
      let input = document.getElementById("entrance_password");
      if (input.getAttribute("type") == "password") {
        input.setAttribute("type", "text");
      } else {
        input.setAttribute("type", "password");
      }
    },
    //Открыть окно смена пароля
    open_password_recovery() {
      return this.$store.dispatch("recoveryShow");
    },
    validateLogin(e) {
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
          //e.target.action = action;
          e.target.submit();
        }
      });
    },
  },
  mounted() {
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
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
};
</script>
