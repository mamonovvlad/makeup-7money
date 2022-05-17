<template>
  <div class="languages">
    <a v-for="link in languages" :href="link.url"
       @click.prevent="defineLanguage(link.name)" :class="{'active': getLanguage === link.name }">{{ link.name }}</a>
  </div>
</template>

<script>
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
    getLanguage() {
      return document.getElementById("language").value;
    },
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
      let language = document.getElementById("language");
      if (language.value === "ru") {
        this.setLocate("ru");
      } else if (language.value === "ua") {
        this.setLocate("ua");
      } else if (language.value === "en") {
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
.languages {
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;
    height: 26px;
    font-weight: 600;
    order: 1;
    font-size: 20px;
  }

  & .active {
    order: -1;
  }
}
</style>