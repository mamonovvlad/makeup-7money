<template>
  <div class="exchange-information">

      <icon-info :theme="theTheme"></icon-info>
    <p>
      При выборе первой кнопки, Ваша скидка по программе лояльности будет учитываться в сумме''Я ОТДАЮ''.
      При выборе второй кнопки, Ваша скидка по программе лояльности будет учитываться в сумме''Я
      ПОЛУЧАЮ''. При обмене bitcoin, скидка всегда будет насчитываться на вторую валюту, которая указана в
      заявке.
    </p>
  </div>
</template>

<script>
import IconInfo from "../icons/IconInfo.vue";

export default {
  name: "TheExchangeInformation",
  props: {
    theTheme: String,
    default: "",
  },
  components: {
    IconInfo,
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";
.exchange-information {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--quaternary);
  line-height: 140%;

  & figure {
    max-width: 45px;
    margin-right: 15px;
    @include _768 {
      display: none;
    }
    & svg{
      width: 100%;
    }
  }
}
</style>