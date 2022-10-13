<template>
  <div class="currencies-list" ref="currenciesList">
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
      >
        <div
          class="item"
          :class="{ 'active-currency': currency.id == currencyId }"
          v-tippy
        >
          <div class="name">
            <span :class="currency.code"></span>
            <transition name="currencies-hide">
              <p v-if="currenciesHide">
                {{ currency.name_ru }}
              </p>
            </transition>
          </div>
          <transition name="currencies-hide">
            <span class="price">
              <span v-show="currenciesHide && activeIndex === 0">
                {{ currency.rate }}
              </span>
              <span v-show="currenciesHide && activeIndex === 1">
                {{ currency.amount }}
              </span>
            </span>
          </transition>
        </div>
        <tippy v-if="!currenciesHide" singleton>{{ currency.name_ru }}</tippy>
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
import { mapMutations } from "vuex";

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
  methods: {
    ...mapMutations(["setActiveCurrency"]),
    setActive(currencyName, id) {
      this.setActiveCurrency([currencyName, id]);
    },
    toggle() {
      let currenciesList = this.$refs.currenciesList;
      let currenciesWrapper = this.$refs.currenciesWrapper;
      if (currenciesList.clientHeight === 535) {
        currenciesList.style.maxHeight =
          currenciesWrapper.clientHeight + 40 + "px";
        this.toggleText = false;
      } else {
        currenciesList.style.maxHeight = "";
        this.toggleText = true;
      }
    },
  },

  updated() {
    let currenciesWrapper = this.$refs.currenciesWrapper;
    this.isShow = currenciesWrapper.clientHeight >= 535;
  },
};
</script>

<style lang="scss">
.currencies {
  &-list {
    position: relative;
    max-height: 535px;
    overflow-y: scroll;
    transition: var(--transition);

    &::-webkit-scrollbar {
      width: 4px;
    }

    & .item {
      display: flex;
      align-items: center;
      padding: 8px 10px;
      justify-content: space-between;
      border-radius: var(--radius-four);
      transition: var(--transition);
      cursor: pointer;
      position: relative;
      white-space: nowrap;

      &:hover {
        box-shadow: var(--shadow-inset);
      }
    }

    & .active-currency {
      box-shadow: var(--shadow-inset);
      background: var(--primary-transition);
    }

    & .name {
      display: flex;
      align-items: center;

      & span {
        width: 20px;
        height: 20px;
        background-size: contain;
      }

      & p {
        margin-left: 5px;
      }
    }

    & .price {
      color: var(--quaternary);
      font-size: 12px;
      font-weight: 600;
    }
  }

  &__wrapper {
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

  & .title--small {
    position: absolute;
  }
}
</style>
