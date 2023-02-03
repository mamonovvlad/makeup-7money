<template>
  <section class="recent-exchanges" v-if="showHideBlock">
    <the-title class="title" tag="h2">Последние обмены</the-title>
    <div class="wrapper">
      <div class="item stylish-wrapper">
        <div>
          <span>Bitcoin</span>
          <span>10000</span>
        </div>

        <div>
          <span>BNB</span>
          <span>10000</span>
        </div>
      </div>
      <div class="item stylish-wrapper">
        <div>
          <span>Bitcoin</span>
          <span>10000</span>
        </div>

        <div>
          <span>BNB</span>
          <span>10000</span>
        </div>
      </div>
      <div class="item stylish-wrapper">
        <div>
          <span>Bitcoin</span>
          <span>10000</span>
        </div>

        <div>
          <span>BNB</span>
          <span>10000</span>
        </div>
      </div>
    </div>
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

<style lang="scss">
.recent-exchanges {
  & .title {
    margin-bottom: 10px;
  }
  & .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
