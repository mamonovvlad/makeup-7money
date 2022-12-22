<template>
  <div
    class="currencies-column stylish-wrapper"
    :class="{ 'currencies-hide': !currenciesHideBuy }"
  >
    <div v-if="currenciesHideBuy">
      <div class="title__wrapper">
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
import { defineAsyncComponent } from "vue";

const TheTitle = defineAsyncComponent(() => import("./TheTitle.vue"));
const TheFilters = defineAsyncComponent(() => import("./TheFilters.vue"));
const TheCurrenciesList = defineAsyncComponent(() =>
  import("./TheCurrenciesList.vue")
);
import { mapGetters } from "vuex";

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
  },
  computed: {
    ...mapGetters([
      "buyCurrencies",
      "getBuyCurrencyGroup",
      "getBuyCurrencyGroupId",
      "buyCurrencyId",
      "sellCurrencyId",
      "currenciesHideBuy",
      "getRateReserves",
    ]),
  },
  methods: {
    toggleInformation(idx) {
      this.index = idx;
    },
  },
};
</script>
