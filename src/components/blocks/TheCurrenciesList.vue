<template>
  <div class="currencies-list">
    <ul
      class="currencies__wrapper"
      ref="currenciesWrapper"
      :data-filter="currencyGroup"
      :class="{ active: !currenciesHide }"
    >
      <li
        v-for="(currency, i) in currencies"
        :key="currency.id"
        :class="{ 'active-currency': currency.id == currencyId }"
        :data-alias="currency.code"
        :data-group="currency.group.name"
        :data-id="currency.id"
        class="item"
        @click="setActive(currencyName, currency.id)"
      >
        <div class="name">
          <span :class="currency.code"></span>
          <transition name="currencies-hide">
            <p v-if="currenciesHide">
              {{ currency.name_ru }}
            </p>
          </transition>
        </div>
        <div class="price" :data-id="currency.id" v-if="currenciesHide"></div>
        <!--        <div class="price" v-if="currency.rate && currenciesHide">-->
        <!--          <span> {{ currency.rate }}</span>\\-->
        <!--          <span> {{ currency.amount }}</span>-->
        <!--        </div>-->
        <!--        <div class="price" :data-id="currency.id" v-if="currenciesHide">-->
        <!--          <span>{{ getIdPrice }}</span>-->
        <!--        </div>-->
      </li>
    </ul>
    <the-show-more-currencies
      @click.native="toggle"
      v-if="isShow && currenciesHide"
    >
      {{ nameTitle }}
    </the-show-more-currencies>
  </div>
</template>

<script>
import TheShowMoreCurrencies from "../buttons/TheShowMoreCurrencies.vue";
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
    rateReserves: {
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
  },
  name: "TheCurrenciesList",
  data() {
    return {
      isShow: false,
      nameTitle: "Показать еще",
    };
  },
  components: {
    TheShowMoreCurrencies,
  },
  computed: {},
  methods: {
    showCourse(id) {
      let price = document.querySelectorAll(".price");
      price.forEach((item) => {
        if (item.getAttribute("data-id") !== null) {
        }
      });

      console.log(this.currencies);
      // console.log(rateReserve.buyCurrency.id);
      console.log(id);
      // if (rateReserve.buyCurrency.id === id) {
      //   // console.log(rateReserve.buyCurrency.id);
      //   return rateReserve.buyCurrency.id;
      // }

      // if (
      //   typeof rateReserve.buyCurrency.id === "string" &&
      //   typeof rateReserve.buyCurrency.id !== "null"
      // ) {
      //   price.forEach((item) => {
      //     // console.log(item.getAttribute("data-id"));
      //     if (item.getAttribute("data-id") === rateReserve.buyCurrency.id) {
      //       // console.log(rateReserve);
      //       // return rateReserve.amount;
      //     }
      //   });
      // }
    },
    ...mapMutations(["setActiveCurrency"]),
    setActive(currencyName, id) {
      this.setActiveCurrency([currencyName, id]);
    },
    toggle() {
      let currenciesList = this.$refs.currenciesList;
      let currenciesWrapper = this.$refs.currenciesWrapper;

      if (currenciesList.clientHeight === 535) {
        currenciesList.style.maxHeight = currenciesWrapper.clientHeight + "px";
        this.nameTitle = "Скрыть";
      } else {
        currenciesList.style.maxHeight = "";
        this.nameTitle = "Показать еще";
      }
    },
    hideButton() {
      let currenciesWrapper = this.$refs.currenciesWrapper;
      this.isShow = currenciesWrapper.clientHeight >= 535;
    },
  },
  updated() {
    this.hideButton();
  },
};
</script>

<style lang="scss">
.currencies {
  &-list {
    position: relative;
    max-height: 535px;
    overflow: hidden;
    transition: var(--transition);

    & .item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
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
}
</style>
