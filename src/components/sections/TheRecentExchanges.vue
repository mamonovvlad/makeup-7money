<template>
  <section class="recent-exchanges" v-if="showHideBlock">
    <the-title class="title" tag="h2">Последние обмены</the-title>
    <div class="stylish-wrapper wrapper">Последние обмены</div>
  </section>
</template>

<script>
import TheTitle from "../blocks/TheTitle.vue";
import { mapGetters } from "vuex";
export default {
  name: "TheRecentExchanges",
  components: {
    TheTitle,
  },
  computed: {
    ...mapGetters(["blockHide"]),
    showHideBlock() {
      if (window.innerWidth > 992) {
        return this.blockHide;
      }
    },
  },
};
</script>

<style lang="scss"></style>
