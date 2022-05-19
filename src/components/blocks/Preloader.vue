<template>
  <div v-if="loading" class="preloader__box">
    <div class="preloader">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>
<style lang="scss">
.preloader {
  position: relative;
  width: 100px;
  height: 100px;
  &__box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--primary-background);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  & .line {
    position: absolute;
    border-radius: 50%;
    border-bottom: 2px solid var(--transparent);
    border-bottom-color: var(--primary-color);
    &:nth-child(1) {
      width: 25px;
      height: 25px;
      animation: preloader 600ms linear infinite;
    }
    &:nth-child(2) {
      width: 50px;
      height: 50px;
      animation: preloader 800ms linear infinite;
    }
    &:nth-child(3) {
      width: 75px;
      height: 75px;
      animation: preloader 1000ms linear infinite;
    }
    &:nth-child(4) {
      width: 100px;
      height: 100px;
      animation: preloader 1200ms linear infinite;
    }
  }
}
</style>
