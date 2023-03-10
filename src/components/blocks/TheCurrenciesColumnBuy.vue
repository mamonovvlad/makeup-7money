<template>
  <div
    class="currencies-column stylish-wrapper"
    :class="{ 'currencies-hide': !currenciesHideBuy }"
  >
    <div class="information-block" v-if="currenciesHideBuy">
      <the-step-back v-if="showStepBack"></the-step-back>
      <div class="elements__wrapper">
        <the-title tag="h2" class="subtitle">{{ $t("theGet") }}</the-title>
        <transition name="fade">
          <div class="buttons" v-if="sellCurrencyId !== null">
            <button
              v-for="(button, idx) in buttons"
              :key="idx"
              :class="{ 'active--filters': index === idx }"
              @click="toggleInformation(idx)"
            >
              {{ $t(`${button.name}`) }}
            </button>
          </div>
        </transition>
      </div>
      <the-filters :group-id="getBuyCurrencyGroupId" type="buy"></the-filters>
      <div class="line"></div>
    </div>

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
import TheStepBack from "./TheStepBack.vue";
import TheBigButton from "../buttons/TheBigButton.vue";
import TheTitle from "./TheTitle.vue";
import TheFilters from "./TheFilters.vue";
import TheCurrenciesList from "./TheCurrenciesList.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "TheCurrenciesColumn",
  data() {
    return {
      index: 0,
      buttons: [
        {
          name: "course",
        },
        {
          name: "reserves",
        },
      ],
    };
  },
  components: {
    TheTitle,
    TheFilters,
    TheCurrenciesList,
    TheBigButton,
    TheStepBack,
  },
  computed: {
    ...mapGetters([
      "buyCurrencies",
      "getBuyCurrencyGroup",
      "getBuyCurrencyGroupId",
      "buyCurrencyId",
      "sellCurrencyId",
      "currenciesHideBuy",
    ]),
    showStepBack() {
      return window.innerWidth <= 768 && this.sellCurrencyId !== null;
    },
  },
  methods: {
    toggleInformation(idx) {
      this.index = idx;
    },
  },
};
</script>
