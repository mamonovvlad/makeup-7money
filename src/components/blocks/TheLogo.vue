<template>
  <a :href="$t('linkLogo')" class="logo" @click.prevent="clearHistory">
    <icon-logo></icon-logo>
  </a>
</template>

<script>
import axios from "axios";
import IconLogo from "../icons/IconLogo.vue";

export default {
  name: "TheLogo",
  components: { IconLogo },

  methods: {
    clearHistory() {
      axios
        .get(`${process.env.PROXY}/site/clear-last-ids`)
        .then((response) => {
          let url = document.querySelector(".logo").href;
          document.location = url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.logo {
  display: block;

  & figure {
    width: 97px;
    height: 45px;
    @include _768 {
      width: 80px;
    }
  }

  & svg {
    width: 100%;
    height: 100%;
  }
}
</style>
