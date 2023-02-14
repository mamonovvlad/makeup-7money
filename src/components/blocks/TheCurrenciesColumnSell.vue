<template>
  <div
    class="currencies-column stylish-wrapper"
    :class="{ 'currencies-hide': !currenciesHideSell }"
  >
    <div class="information-block" v-if="currenciesHideSell">
      <the-title tag="h2" class="subtitle">{{ $t("theGive") }} </the-title>
      <the-filters :group-id="getSellCurrencyGroupId" type="sell">
      </the-filters>
      <div class="line"></div>
    </div>

    <the-currencies-list
      :currencies-hide="currenciesHideSell"
      :currency-group="getSellCurrencyGroup.name"
      :currencies="allCurrencies"
      :currency-id="sellCurrencyId"
      currency-name="sell"
    >
    </the-currencies-list>
    <the-refresh v-if="!currenciesHideSell" @click="refresh"></the-refresh>
  </div>
</template>

<script>
import TheTitle from "./TheTitle.vue";
import TheRefresh from "./TheRefresh.vue";
import TheCurrenciesList from "./TheCurrenciesList.vue";
import TheFilters from "./TheFilters.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheCurrenciesColumn",
  components: {
    TheTitle,
    TheRefresh,
    TheFilters,
    TheCurrenciesList,
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
    transition: all 0.5s ease;
    max-width: 340px;
    height: max-content;
    flex: 1;

    & .line {
      margin-bottom: 10px;
    }
    & .information-block {
      overflow: hidden;
      padding: 16px 16px 0 16px;
    }
  }

  &-hide {
    transition: all 0.5s ease;
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

.elements__wrapper {
  & .buttons {
    display: flex;
    column-gap: 10px;

    & button {
      background: transparent;
    }
  }
}
</style>
