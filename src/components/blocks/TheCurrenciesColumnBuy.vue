<template>
  <div
    class="currencies-column stylish-wrapper"
    :class="{ 'currencies-hide': !hide }"
  >
    <template v-if="hide">
      <div class="title__wrapper">
        <the-title tag="h2" class="subtitle"> Получаю</the-title>
        <div class="buttons">
          <button>Курс</button>
          <button>Резервы</button>
        </div>
      </div>
      <ul class="filters">
        <li
          :class="{ active: getBuyCurrencyGroupId == null }"
          @click="setResetGrout('buy')"
        >
          ALL
        </li>
        <li
          v-for="(group, i) in getCurrencyGroups"
          :key="i"
          :class="{ active: group.id === getBuyCurrencyGroupId }"
          @click="setGroup('buy', i)"
        >
          {{ group.name }}
        </li>
      </ul>
      <div class="line"></div>
    </template>
    <the-currencies-list
      :currencies-hide="hide"
      :currency-group="getBuyCurrencyGroup.name"
      :currencies="buyCurrencies"
      :currency-id="callbackCurrencyId"
      currency-name="buy"
      :active-currency="callbackActiveCurrency"
    >
    </the-currencies-list>
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
      "buyCurrencies",
      "getBuyCurrencyGroup",
      "getBuyCurrencyGroupId",
    ]),
  },
  methods: {
    ...mapMutations(["setCurrencyGroup", "setResetCurrencyGroup"]),
    setGroup(type, idx) {
      console.log(type);
      this.setCurrencyGroup([type, idx]);
    },
    setResetGrout(type) {
      console.log(type);
      this.setResetCurrencyGroup(type);
    },
  },
};
</script>
