<template>
  <div
    class="currencies-column stylish-wrapper"
    :class="{ 'currencies-hide': !hide }"
  >
    <template v-if="hide">
      <the-title tag="h2" class="subtitle"> Отдаю</the-title>
      <ul class="filters">
        <li
          :class="{ active: getSellCurrencyGroupId == null }"
          @click="setResetGrout('sell')"
        >
          ALL
        </li>
        <li
          v-for="(group, i) in getCurrencyGroups"
          :key="i"
          :class="{ active: group.id === getSellCurrencyGroupId }"
          @click="setGroup('sell', i)"
        >
          {{ group.name }}
        </li>
      </ul>
      <div class="line"></div>
    </template>
    <the-currencies-list
      :currencies-hide="hide"
      :currency-group="getSellCurrencyGroup.name"
      :currencies="allCurrencies"
      :currency-id="callbackCurrencyId"
      currency-name="sell"
      :active-currency="callbackActiveCurrency"
    >
    </the-currencies-list>
    <!--    <the-refresh v-if="!currenciesHideBuy" @click="refresh"></the-refresh>-->
  </div>
</template>

<script>
import TheTitle from "./TheTitle.vue";
import TheRefresh from "./TheRefresh.vue";
import TheCurrenciesList from "./TheCurrenciesList.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheCurrenciesColumn",
  props: {
    hide: {
      type: Boolean,
      default: false,
    },
    callbackActiveCurrency: {
      type: Function,
      default: () => {},
    },
    callbackCurrencyId: {
      type: [String, Number],
      default: "",
    },
  },
  components: {
    TheTitle,
    TheRefresh,
    TheCurrenciesList,
  },
  computed: {
    ...mapGetters([
      "getCurrencyGroups",
      "allCurrencies",
      "getSellCurrencyGroup",
      "getSellCurrencyGroupId",
    ]),
  },
  methods: {
    ...mapMutations(["setCurrencyGroup", "setResetCurrencyGroup"]),
    setGroup(type, idx) {
      this.setCurrencyGroup([type, idx]);
    },
    setResetGrout(type) {
      this.setResetCurrencyGroup(type);
    },
  },
};
</script>

<style lang="scss">
.currencies {
  position: relative;
  display: flex;
  justify-content: center;
  column-gap: 20px;

  & .filters {
    display: flex;
    justify-content: space-between;
    margin: 30px 0 0;

    & li {
      font-size: 12px;
      padding: 6px;
      cursor: pointer;
    }

    & .active {
      box-shadow: var(--shadow);
      color: var(--primary);
      font-weight: 600;
      border-radius: var(--radius-four);
    }
  }

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

    & .currencies-list {
      max-height: 100%;
    }
  }
}

.title__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;

  & .buttons {
    display: flex;
    column-gap: 10px;

    & button {
      background: transparent;
    }
  }
}
</style>
