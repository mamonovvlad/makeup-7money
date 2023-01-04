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
