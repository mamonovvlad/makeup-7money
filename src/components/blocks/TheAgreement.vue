<template>
  <the-animation-border class="checkbox__agreement" :border-red="error">
    <the-checkbox name-id="orderform-of_exchange">
      <input type="checkbox" name="OrderForm[agree]" id="orderform-agree" @click="confirmChecked" />
      <label class="label" for="orderform-agree">
        <span>
          Нажимая на кнопку, я подтверждаю, что я ознакомился и согласен с условиями
          <a href="https://makeup.7money.co/page/security">Безопасности</a> и
          <a href="https://makeup.7money.co/page/agreement">Соглашением сайта</a>
        </span>
      </label>
    </the-checkbox>
  </the-animation-border>

</template>

<script>
import TheAnimationBorder from "./TheAnimationBorder.vue";
import TheCheckbox from "./TheCheckbox.vue";

export default {
  name: "ThrAgreement",
  data() {
    return {
      error: true,
    };
  },
  components: {
    TheAnimationBorder,
    TheCheckbox,
  },
  methods: {
    confirmChecked() {
      let checkBox = document.getElementById("orderform-agree");
      if (checkBox && checkBox.checked === true) {
        this.enabled();
      } else {
        this.disabled();
      }
    },
    enabled() {
      let button = document.getElementById("order-submit");
      button.removeAttribute("disabled");
      button.classList.remove("disabled");
      this.error = false;
    },
    disabled() {
      let button = document.getElementById("order-submit");
      button.setAttribute("disabled", "disabled");
      button.classList.add("disabled");
      this.error = true;
    },
  },
};
</script>

<style lang="scss">
.checkbox__agreement {
  max-width: max-content;
}
</style>