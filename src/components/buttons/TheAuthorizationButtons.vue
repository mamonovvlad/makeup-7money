<template>
  <div class="authorization__buttons">
    <template v-if="isShow">
      <button v-for="(button ,idx) in buttons" @click="$emit('open',idx)"> {{ $t(`${button.name}`) }}</button>
    </template>
    <template v-else>
      <a :href="$t('personalAccountLink')">
        {{ $t("personalAccount") }}
      </a>
      <a :href="$t('logoutAction')" data-method="post">
        {{ $t("logout") }}
      </a>
    </template>
  </div>
</template>
<script>
let buttons = [
  {
    name: "logIn",
  },
  {
    name: "signUp",
  },
];
let theLogin = document.getElementById("login");
export default {
  name: "TheAuthorizationButtons",
  data() {
    return {
      buttons,
      theLogin,
      isShow: true,
    };
  },
  methods: {
    login() {
      this.isShow = theLogin.value === "0";
    },
  },
  mounted() {
    this.login();
  },
};
</script>


<style lang="scss">
.authorization__buttons {
  position: absolute;
  background-color: var(--seventh);
  border-radius: var(--radius-four);
  box-shadow: var(--shadow);
  transition: var(--transition);
  padding: 15px;
  top: 70px;
  left: 0;
  text-align: left;
  z-index: 1;

  &:after {
    content: "";
    position: absolute;
    left: 15px;
    top: -24px;
    border: 10px solid rgba(0, 0, 0, 0);
    border-bottom: 14px solid var(--seventh);
  }

  & button, a {
    background-color: var(--transparent);
    font-size: 18px;
    font-weight: 600;
    display: block;
    text-decoration: none;
    width: max-content;
    line-height: 140%;
  }

}
</style>