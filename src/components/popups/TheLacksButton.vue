<template>
  <div class="lacks">
    <span>{{ $t("lacks") }}</span>
    <div class="wrapper">
      <p>
        Максимальная сумма получения {{ calculateData.max_buy_amount }}
        {{ buyCurrency.symbol }}
        <strong>
          {{ getValueByLanguage(buyCurrency, "name_?") }}
        </strong>
      </p>
      <the-button type="button" @click.native="showLacks = true" tag="button">
        <template #name>{{ $t("lacks") }}</template>
      </the-button>
    </div>
  </div>
  <the-lacks-window v-if="showLacks" @close="showLacks = false">
    <form class="form">
      <div class="field">
        <label>Валюта</label>
        <span class="form-group">
          <select
            name="ReserveNotification[currency_id]"
            id="reservenotification-currency_id"
          >
            <option value="93">USD</option>
          </select>
        </span>
      </div>
      <div class="field">
        <label>Город</label>
        <span class="form-group">
          <select
            name="ReserveNotification[currency_id]"
            id="reservenotification-currency_id"
          >
            <option value="93">Киев</option>
          </select>
        </span>
      </div>
      <div class="field">
        <label for="orderform-telegram">Email</label>
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
      <div class="field">
        <label for="reservenotification-amount">Сума</label>
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
      <button type="submit" class="button">Сохранить</button>
    </form>
  </the-lacks-window>
</template>

<script>
import TheButton from "../buttons/TheButton.vue";
import TheLacksWindow from "./TheLacksWindow.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    getValue: {
      type: () => {},
    },
  },
  name: "TheLacksButton",
  data() {
    return {
      showLacks: false,
    };
  },
  computed: {
    ...mapGetters(["calculateData", "buyCurrency"]),
  },
  components: {
    TheButton,
    TheLacksWindow,
  },
  methods: {
    getValueByLanguage(object, field) {
      let nameWithLang = field.replace(
        "?",
        document.getElementById("language").value
      );
      if (object[nameWithLang] !== undefined) {
        return object[nameWithLang];
      }
      return "undefined " + nameWithLang;
    },
  },
};
</script>

<style scoped></style>
