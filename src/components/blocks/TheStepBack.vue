<template>
  <div class="step-back">
    <the-title tag="h2" class="subtitle">{{ $t("theGive") }}</the-title>
    <div class="elements__wrapper">
      <div class="name">
        <span :class="selectedCurrency.code" class="currency-icon"></span>
        <template v-if="this.getLanguage === 'en'">
          {{ selectedCurrency.name_en }}
        </template>
        <template v-else-if="this.getLanguage === 'ua'">
          {{ selectedCurrency.name_ua }}
        </template>
        <template v-else> {{ selectedCurrency.name_ru }}</template>
      </div>
      <button @click="trashClick">Изменить</button>
    </div>
    <icon-arrow></icon-arrow>
  </div>
</template>

<script>
import TheTitle from "./TheTitle.vue";
import IconArrow from "../icons/IconArrow.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheStepBack",
  components: {
    TheTitle,
    IconArrow,
  },
  computed: {
    ...mapGetters(["allCurrencies", "getLanguage", "sellCurrencyId"]),
    selectedCurrency() {
      let currency = null;
      if (this.allCurrencies) {
        for (let i = 0; i < this.allCurrencies.length; i++) {
          if (+this.allCurrencies[i].id === +this.sellCurrencyId) {
            currency = this.allCurrencies[i];
            break;
          }
        }
        return currency;
      }
    },
  },
  methods: {
    ...mapMutations(["trashClick"]),
  },
};
</script>

<style lang="scss">
.step-back {
  position: relative;
  display: flex;
  flex-direction: column;
  & .elements__wrapper {
    margin-top: 8px;
    margin-bottom: 16px;
    padding: 6px;
    border-radius: var(--radius-four);
    background: var(--secondary);
  }
  & .name {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }
  & svg {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) rotate(270deg);
    animation: animate-arrow 2s ease-in infinite;
  }
  @keyframes animate-arrow {
    0% {
      bottom: 0;
    }
    50% {
      bottom: 10px;
    }
    100% {
      bottom: 0;
    }
  }
}
</style>
