<template>
  <div
    class="currencies-column stylish-wrapper column--sell"
    :class="{ 'currencies-hide': !currenciesHideSell }"
  >
    <template v-if="currenciesHideSell">
      <the-title tag="h2" class="subtitle">{{ $t("theGive") }}</the-title>
      <the-filters :group-id="getSellCurrencyGroupId" type="sell"></the-filters>
      <div class="line"></div>
    </template>

    <the-currencies-list
      :currencies-hide="currenciesHideSell"
      :currency-group="getSellCurrencyGroup.name"
      :currencies="allCurrencies"
      :currency-id="sellCurrencyId"
      currency-name="sell"
    >
    </the-currencies-list>
<!--    <the-show-more-currencies></the-show-more-currencies>-->
    <the-refresh v-if="!currenciesHideSell" @click="refresh"></the-refresh>
  </div>
</template>

<script>
import TheTitle from "./TheTitle.vue";
import TheRefresh from "./TheRefresh.vue";
import TheCurrenciesList from "./TheCurrenciesList.vue";
import TheFilters from "./TheFilters.vue";
import TheShowMoreCurrencies from "../buttons/TheShowMoreCurrencies.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheCurrenciesColumn",
  components: {
    TheTitle,
    TheRefresh,
    TheFilters,
    TheCurrenciesList,
    TheShowMoreCurrencies
  },
  computed: {
    ...mapGetters([
      "allCurrencies",
      "getSellCurrencyGroup",
      "getSellCurrencyGroupId",
      "sellCurrencyId",
      "currenciesHideSell",
    ]),
  },
  methods: {
    ...mapMutations(["setRefresh"]),
    refresh() {
      this.setRefresh();
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.currencies {
  position: relative;
  display: flex;
  justify-content: center;
  column-gap: 20px;

  &-column {
    position: relative;
    transition: var(--transition);
    max-width: 320px;
    height: max-content;
    padding: 16px;
    flex: 1;

    & .line {
      margin: 10px 0;
    }
  }

  &-hide {
    transition: var(--transition);
    min-width: 76px;
    max-width: 76px;
    flex: 2;
    @include _992 {
      display: none;
    }

    & .currencies-list {
      max-height: 100%;
    }
  }

  & .buttons {
    & button {
      transition: box-shadow 400ms ease;
      padding: 6px;
    }
  }
}

.title__wrapper {
  & .buttons {
    display: flex;
    column-gap: 10px;

    & button {
      background: transparent;
    }
  }
}
</style>
