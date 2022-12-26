<template>
  <a
    v-for="link in languages"
    :href="link.url"
    @click.prevent="defineLanguage(link.name)"
    :class="{ active: getLanguage === link.name }"
    >{{ link.name }}</a
  >
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheLanguages",
  data() {
    return {
      languages: [
        {
          name: "ru",
          url: "/",
        },
        {
          name: "ua",
          url: "/ua",
        },
        {
          name: "en",
          url: "/en",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getLanguage"]),
  },
  methods: {
    setLocate(locale) {
      this.$i18n.locale = locale;
    },
    getUrlWithoutLanguage() {
      let link = location.pathname;

      if (link[0] === "/") {
        link = link.substr(1);
      }

      let segments = link.split("/");
      if (segments.length > 0 && segments[0].length === 2) {
        segments.shift();
      }
      return segments.join("/");
    },

    defineLanguage(name) {
      if (this.getLanguage !== name) {
        window.location = `/${name}/` + this.getUrlWithoutLanguage();
      }
    },
    language() {
      if (this.getLanguage === "ru") {
        this.setLocate("ru");
      } else if (this.getLanguage === "ua") {
        this.setLocate("ua");
      } else if (this.getLanguage === "en") {
        this.setLocate("en");
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.language();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.languages .btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  @include _768 {
    row-gap: 10px;
  }

  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;
    height: 26px;
    font-weight: 500;
    order: 1;
    font-size: 20px;
    @include _768 {
      font-size: 18px;
    }
  }

  & .active {
    order: -1;
  }
}
</style>
