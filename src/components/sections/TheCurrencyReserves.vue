<template>
  <section
    class="currency-reserves"
    id="currency-reserves"
    v-if="showHideBlock"
  >
    <the-title class="title" tag="h2">{{ $t("currencyReserves") }}</the-title>
    <div class="wrapper stylish-wrapper">
      <div class="block" v-for="column in columns">
        <div v-for="currency in column" class="item">
          <div class="name">
            <span :class="currency.code"></span>
            <p>{{ currency.name_ru }}</p>
          </div>
          <div class="price">
            <p>{{ Number(currency.amount).toFixed(2) }}</p>
            <span>{{ currency.symbol }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TheTitle from "../blocks/TheTitle.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "TheCurrencyReserves",
  data() {
    return {
      currencies: [],
      cols: 3,
    };
  },
  computed: {
    ...mapGetters(["blockHide"]),
    columns() {
      let columns = [];
      let mid = Math.ceil(this.currencies.length / this.cols);
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.currencies.slice(col * mid, col * mid + mid));
      }
      return columns;
    },
    showHideBlock() {
      if (window.innerWidth > 992) {
        return this.blockHide;
      }
    },
  },
  components: { TheTitle },
  methods: {
    getCurrencies() {
      axios
        .get(
          process.env.PROXY2 +
            "/v1/currency?active=1&access-token=EFjko3OineBf8RQCth33wpC0dZqM4CyO&_format=json"
        )
        .then((res) => {
          this.currencies = res.data;
        });
    },
  },
  mounted() {
    this.getCurrencies();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";
.currency-reserves {
  & .title {
    margin-bottom: 20px;
  }

  & .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 12px 10px;
  }

  & .block {
    padding: 0 20px;
    border-right: 2px solid var(--eleventh);
    transition: var(--transition);
    @include _1200 {
      padding: 0 12px;
    }
    &:last-child {
      margin-right: 0;
      border-right: 0;
    }
  }

  & .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
  }

  & .name,
  & .price {
    display: flex;
    align-items: center;
  }

  & .name {
    padding-right: 6px;
    & span {
      min-width: 16px;
      height: 16px;
      margin-right: 5px;
      margin-bottom: 2px;
      background-size: cover;
      border-radius: var(--radius-ten);
    }
    & p {
      @include crop-height(1);
    }
  }

  & .price {
    & p {
      margin-right: 4px;
      color: var(--quaternary);
      font-weight: 500;
    }

    & span {
      font-size: 12px;
    }
  }
}
</style>
