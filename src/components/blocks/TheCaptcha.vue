<template>
  <div class="captcha">
    <div class="g-recaptcha"></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "TheCaptcha",
  methods: {
    ...mapMutations(["captcha"]),
  },
  mounted() {
    this.captcha();
  },
};
</script>

<style lang="scss">
.captcha {
  padding: 12px 10px;
  border-radius: var(--radius-four);
  text-align: center;
  background: var(--secondary);

  .g-recaptcha {
    position: relative !important;
    overflow: hidden !important;
    right: 0 !important;
    bottom: 0 !important;
    max-width: 302px !important;
    width: 100% !important;
    height: auto !important;
    background: #d3d3d3 !important;
    margin: 0 auto;

    & iframe {
      border: 0;
      width: 100%;
      height: 76px;
    }
  }
}
</style>
