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
        <input type="hidden" :value="csrfToken" :name="csrfParam" />
        <p>{{ nameSellCurrency }} --- {{ nameBuyCurrency }}</p>
        <div class="field">
          <label>{{ $t("lacksLabel") }} {{ nameBuyCurrency }}</label>
          <span class="form-group">
            <input
              type="text"
              maxlength="8"
              id="reservenotification-amount"
              name="ReserveNotification[amount]"
              v-model="calculateData.buy_amount"
            />
          </span>
        </div>
        <div class="field" v-if="isCash">
          <label>{{ $t("city") }}</label>

          <div class="custom-select">
            <button type="button" class="select form-group" @click="openSelect">
              <span class="select-name">
                <template
                  v-if="selectName !== null && selectName !== undefined"
                >
                  {{ selectName }}
                </template>
                <template v-else> {{ $t("city") }} </template>
              </span>
              <icon-arrow></icon-arrow>
              <input
                type="hidden"
                class="select-value"
                name="ReserveNotification[city_id]"
                :value="calculateData.primary_city_id"
              />
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
              placeholder="example@gmail.com"
              aria-required="true"
              required
            />
          </span>
        </div>
        <button type="submit" class="button">{{ $t("save") }}</button>
        <input
          id="lang_id"
          name="ReserveNotification[lang_id]"
          type="hidden"
          :value="lid"
        />
        <input
          id="course_id"
          name="ReserveNotification[course_id]"
          type="hidden"
          :value="calculateData.course.id"
        />
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
      csrfToken: null,
      csrfParam: null,
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
    nameBuyCurrency() {
      if (this.getLang === "/en") {
        return this.calculateData.buyCurrency.name_en;
      } else if (this.getLang === "/ua") {
        return this.calculateData.buyCurrency.name_ua;
      } else {
        return this.calculateData.buyCurrency.name_ru;
      }
    },
    nameSellCurrency() {
      if (this.getLang === "/en") {
        return this.calculateData.sellCurrency.name_en;
      } else if (this.getLang === "/ua") {
        return this.calculateData.sellCurrency.name_ua;
      } else {
        return this.calculateData.sellCurrency.name_ru;
      }
    },
    lid() {
      return document.getElementById("lid").getAttribute("value");
    },
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
  mounted() {
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
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
