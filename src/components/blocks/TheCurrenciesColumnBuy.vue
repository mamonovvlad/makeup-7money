<template>
  <div
    class="currencies-column stylish-wrapper column--buy"
    :class="{ 'currencies-hide': !currenciesHideBuy }"
  >
    <template v-if="currenciesHideBuy">
      <div class="title__wrapper">
        <the-title tag="h2" class="subtitle"> Получаю</the-title>
        <div class="buttons">
          <button>Курс</button>
          <button>Резервы</button>
        </div>
      </div>
      <the-filters :group-id="getBuyCurrencyGroupId" type="buy"></the-filters>
      <div class="line"></div>
    </template>
    <the-currencies-list
      :currencies-hide="currenciesHideBuy"
      :currency-group="getBuyCurrencyGroup.name"
      :currencies="buyCurrencies"
      :currency-id="buyCurrencyId"
      currency-name="buy"
    >
    </the-currencies-list>
  </div>
</template>

<script>
import TheTitle from "./TheTitle.vue";
import TheFilters from "./TheFilters.vue";
import TheCurrenciesList from "./TheCurrenciesList.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TheCurrenciesColumn",
  components: {
    TheTitle,
    TheFilters,
    TheCurrenciesList,
  },
  computed: {
    ...mapGetters([
      "buyCurrencies",
      "getBuyCurrencyGroup",
      "getBuyCurrencyGroupId",
      "buyCurrencyId",
      "currenciesHideBuy",
      "getRateReserves",
    ]),
  },
  methods: {
    ...mapActions(["fetchRateReserves"]),
  },
  mounted() {
    this.fetchRateReserves();
  },
};
</script>

<style lang="scss">
//@import "../../assets/scss/utils/mixin";
//.column--buy {
//  @include _768 {
//    display: none;
//  }
//}
</style>
