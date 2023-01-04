<template>
  <div class="lacks-window popup-wrapper">
    <div class="wrapper">
      <the-close @close="hideBlock"></the-close>
      <the-title class="subtitle" tag="h2">{{ $t("lacks") }}</the-title>
      <p>{{ $t("lacksWindow_first") }}</p>
      <p>{{ $t("lacksWindow_second") }}</p>
      <p>{{ $t("lacksWindow_third") }}</p>
      <form
        id="reserve-notification-form"
        action="/order/reserve-notification"
        method="post"
        class="form"
      >
        <div class="field">
          <label>{{ $t("theGive") }}</label>
          <span class="form-group input--disabled">
            <input type="text" v-model="calculateData.sell_amount" />
          </span>
        </div>
        <div class="field">
          <label>{{ $t("theGet") }}</label>
          <span class="form-group input--disabled">
            <input type="text" v-model="calculateData.buy_amount" />
          </span>
        </div>
        <div class="field" v-if="isCash">
          <label>{{ $t("city") }}</label>
          <div class="custom-select">
            <button
              type="button"
              class="select form-group"
              @click="openSelect"
              data-value=""
              data-id=""
            >
              <span class="select-name">
                <template
                  v-if="selectName !== null && selectName !== undefined"
                >
                  {{ selectName }}
                </template>
                <template v-else> {{ $t("city") }} </template>
              </span>
              <icon-arrow></icon-arrow>
            </button>
            <ul class="options">
              <li
                @click="selectOptions"
                v-for="(option, id) in calculateData.dropDownCities"
                :value="id"
              >
                {{ option }}
              </li>
            </ul>
          </div>
        </div>
        <div class="field">
          <label for="orderform-telegram">{{ $t("email") }}</label>
          <span class="form-group">
            <input
              type="text"
              id="reservenotification-email"
              name="ReserveNotification[email]"
              placeholder="@username"
              aria-required="true"
              required
            />
          </span>
        </div>
        <div class="field" v-if="isCash">
          <label for="reservenotification-amount">{{ $t("amount") }}</label>
          <span class="form-group">
            <input
              type="text"
              id="reservenotification-amount"
              name="ReserveNotification[amount]"
              required="required"
              aria-required="true"
              placeholder="62.3653"
            />
          </span>
        </div>
        <button type="submit" class="button">{{ $t("save") }}</button>
        <input id="lang_id" type="hidden" />
        <input id="course_id" type="hidden" />
      </form>
    </div>
  </div>
</template>

<script>
import { CurrencyModel } from "../../assets/js/currency-model.js";
import TheTitle from "../blocks/TheTitle.vue";
import TheClose from "../buttons/TheClose.vue";
import { mapGetters, mapMutations } from "vuex";
import IconArrow from "../icons/IconArrow.vue";
export default {
  name: "TheLacksWindow",

  data() {
    return {
      CurrencyModel,
    };
  },
  components: {
    TheTitle,
    TheClose,
    IconArrow,
  },
  computed: {
    ...mapGetters(["calculateData", "getLang", "selectName"]),
    // nameBuyCurrency() {
    //   if (this.getLang === "/en") {
    //     return this.calculateData.buyCurrency.name_en;
    //   } else if (this.getLang === "/ua") {
    //     return this.calculateData.buyCurrency.name_ua;
    //   } else {
    //     return this.calculateData.buyCurrency.name_ru;
    //   }
    // },
    // nameSellCurrency() {
    //   if (this.getLang === "/en") {
    //     return this.calculateData.sellCurrency.name_en;
    //   } else if (this.getLang === "/ua") {
    //     return this.calculateData.sellCurrency.name_ua;
    //   } else {
    //     return this.calculateData.sellCurrency.name_ru;
    //   }
    // },
    isCash() {
      return (
        CurrencyModel.isCash(this.calculateData.buy_currency_id) === true ||
        CurrencyModel.isCash(this.calculateData.sell_currency_id) === true
      );
    },
  },
  methods: {
    ...mapMutations(["openSelect", "selectOptions"]),
    hideBlock() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.lacks-window {
  & .wrapper {
    max-width: 500px;
  }

  & .items__wrapper {
    align-items: flex-end;

    & button {
      width: 100%;
    }
  }

  & .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 30px;
    overflow: hidden;
    background: var(--seventh);
  }

  & .form {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
}
</style>
