<template>
  <div
    class="currencies-column stylish-wrapper column--buy"
    :class="{ 'currencies-hide': !currenciesHideBuy }"
  >
    <template v-if="currenciesHideBuy">
      <div class="title__wrapper">
        <the-title tag="h2" class="subtitle">{{ $t("theGet") }}</the-title>
        <div class="buttons" v-if="sellCurrencyId !== null">
          <button v-for="(button, idx) in buttons" :key="idx" :class="{'active--filters':index === idx}"
                  @click="toggleInformation(idx)">
            {{ button.name }}
          </button>
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
      :active-index="index"
    >
    </the-currencies-list>
  </div>
</template>

<script>
import TheTitle from "./TheTitle.vue";
import TheFilters from "./TheFilters.vue";
import TheCurrenciesList from "./TheCurrenciesList.vue";
import { mapGetters } from "vuex";

export default {
  name: "TheCurrenciesColumn",
  data() {
    return {
      index: 0,
      buttons: [
        {
          name: "Курсы",
        },
        {
          name: "Резервы",
        },
      ],
    };
  },
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
  },
  methods: {
    toggleInformation(idx) {
      this.index = idx;
    },
  },
};
</script>
