<template>
  <div
    class="currencies-column stylish-wrapper column--buy"
    :class="{ 'currencies-hide': !currenciesHideBuy }"
  >
    <template v-if="currenciesHideBuy">
      <div class="title__wrapper">
        <the-title tag="h2" class="subtitle">{{ $t("theGet") }}</the-title>
        <div class="buttons">
          <button>{{ $t("course") }}</button>
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
      :rate-reserves="getRateReserves"
    >
      <!--      <template #price>-->
      <!--        <div class="price">-->
      <!--          {{ this.rateReserves }}-->
      <!--          &lt;!&ndash;          <template&ndash;&gt;-->
      <!--          &lt;!&ndash;            v-for="rateReserve in getRateReserves"&ndash;&gt;-->
      <!--          &lt;!&ndash;            :key="rateReserve.buyCurrency.id"&ndash;&gt;-->
      <!--          &lt;!&ndash;          >&ndash;&gt;-->
      <!--          &lt;!&ndash;            <span v-if="currenciesHideBuy">&ndash;&gt;-->
      <!--          &lt;!&ndash;              <span>&ndash;&gt;-->
      <!--          &lt;!&ndash;                {{ rateReserve.amount }}&ndash;&gt;-->
      <!--          &lt;!&ndash;              </span>&ndash;&gt;-->
      <!--          &lt;!&ndash;            </span>&ndash;&gt;-->
      <!--          &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--        </div>-->
      <!--      </template>-->
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
      "sellCurrencyId",
      "currenciesHideBuy",
      "getRateReserves",
    ]),
    rateReserves() {
      for (let i in this.getRateReserves) {
        for (let id in this.buyCurrencies) {
          if (
            this.getRateReserves[i].buyCurrency.id == this.buyCurrencies[id].id
          ) {
            console.log(this.getRateReserves[i]);
            return this.getRateReserves[i].amount;
          }
        }
      }
    },
  },
  methods: {},
  mounted() {},
};
</script>
