<template>
  <div
    class="currencies-list"
    ref="currenciesList"
    :class="{ 'scroll-y': currenciesHide }"
  >
    <ul
      class="currencies__wrapper"
      ref="currenciesWrapper"
      :data-filter="currencyGroup"
      :class="{ active: !currenciesHide }"
    >
      <li
        v-for="(currency, i) in currencies"
        :key="currency.id"
        :data-alias="currency.code"
        :data-group="currency.group.name"
        :data-id="currency.id"
        @click="setActive(currencyName, currency.id)"
        class="item"
        :class="{ 'active-currency': currency.id == currencyId }"
      >
        <div class="name">
          <span class="currency-icon" :class="currency.code"></span>
          <p v-if="currenciesHide">
            <template v-if="this.getLanguage === 'en'">
              {{ currency.name_en }}
            </template>
            <template v-else-if="this.getLanguage === 'ua'">
              {{ currency.name_ua }}
            </template>
            <template v-else> {{ currency.name_ru }}</template>
          </p>
        </div>
        <span class="price" v-if="sellCurrencyId !== null">
          <span v-show="currenciesHide && activeIndex === 0">
            {{ currency.rate }}
          </span>
          <span v-show="currenciesHide && activeIndex === 1">
            <template v-if="currency.symbol === 'RUB' && currency.id !== '24'">
              {{ currencyRub }}
            </template>
            <template v-else>
              {{ currency.amount }}
            </template>
          </span>
        </span>
        <transition name="fade">
          <span v-show="!currenciesHide" class="tippy">
            <template v-if="this.getLanguage === 'en'">
              {{ currency.name_en }}
            </template>
            <template v-else-if="this.getLanguage === 'ua'">
              {{ currency.name_ua }}
            </template>
            <template v-else> {{ currency.name_ru }}</template>
          </span>
        </transition>
      </li>
    </ul>
  </div>
  <the-show-more-currencies
    @click.native="toggle"
    v-if="isShow && currenciesHide"
  >
    <span v-if="toggleText">
      {{ $t("showMore") }}
    </span>
    <span v-else>{{ $t("hide") }}</span>
  </the-show-more-currencies>
</template>

<script>
import TheShowMoreCurrencies from "../buttons/TheShowMoreCurrencies.vue";
import TheRefresh from "./TheRefresh.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    currencyId: {
      type: [String, Number],
      default: "",
    },
    currencyName: {
      type: [String],
      default: "",
    },
    currencies: {
      type: [Object, Array],
    },
    currenciesHide: {
      type: Boolean,
      default: false,
    },
    currencyGroup: {
      type: String,
      default: "",
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  name: "TheCurrenciesList",
  data() {
    return {
      isShow: false,
      toggleText: true,
    };
  },
  components: {
    TheRefresh,
    TheShowMoreCurrencies,
  },
  computed: {
    ...mapGetters(["sellCurrencyId", "getLanguage"]),
    currencyRub() {
      for (let currency of this.currencies) {
        if (currency.symbol === "RUB" && currency.id === "11") {
          return currency.amount;
        }
      }
    },
  },
  methods: {
    ...mapMutations(["setActiveCurrency"]),
    setActive(currencyName, id) {
      this.setActiveCurrency([currencyName, id]);
    },
    toggle(e) {
      let currenciesList = this.$refs.currenciesList;
      let currenciesWrapper = this.$refs.currenciesWrapper;
      if (currenciesList.clientHeight === 520) {
        currenciesList.style.maxHeight =
          currenciesWrapper.clientHeight + 40 + "px";
        this.toggleText = false;
      } else {
        currenciesList.style.maxHeight = "";
        this.toggleText = true;
        document.querySelector(".header").scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },
  updated() {
    let currenciesWrapper = this.$refs.currenciesWrapper;
    this.isShow = currenciesWrapper.clientHeight >= 520;
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";
.currencies {
  &-list {
    position: relative;
    max-height: 520px;
    transition: var(--transition);

    &::-webkit-scrollbar {
      width: 4px;
    }
    & .item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 8px 12px;
      justify-content: space-between;
      border-radius: var(--radius-four);
      transition: all 0.2s ease;
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        box-shadow: var(--shadow-inset);
      }
    }
    & .active {
      padding-top: 16px;
      padding-bottom: 16px;
    }
    & .active-currency {
      box-shadow: var(--shadow-inset);
      background: var(--primary-transition);
    }

    & .name {
      display: flex;
      align-items: center;

      & p {
        margin-left: 5px;
        font-weight: 500;
      }
    }

    & .price {
      color: var(--quaternary);
      font-size: 12px;
      font-weight: 500;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
    &[data-filter="CASH"] li,
    &[data-filter="UAH"] li,
    &[data-filter="RUB"] li,
    &[data-filter="CRYPT"] li,
    &[data-filter="USD"] li {
      display: none;
    }

    &[data-filter="CASH"] li[data-group="CASH"],
    &[data-filter="UAH"] li[data-group="UAH"],
    &[data-filter="RUB"] li[data-group="RUB"],
    &[data-filter="CRYPT"] li[data-group="CRYPT"],
    &[data-filter="USD"] li[data-group="USD"] {
      display: flex;
    }
  }

  & .scroll-y {
    @include _768 {
      overflow: hidden;
    }
  }
}
.currency-icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  border-radius: var(--radius-ten);
}
</style>
