<template>
  <div class="public-information">
    <the-confetti v-if="animationConfetti"></the-confetti>
    <slot></slot>
  </div>
</template>
<script>
import TheConfetti from "./TheConfetti.vue";

export default {
  props: {
    animationConfetti: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TheConfetti,
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/utils/mixin";

.public-information {
  position: relative;
  background: var(--black);
  text-align: center;
  padding: 5px;
  font-size: 16px;
  @include _992 {
    font-size: 14px;
  }
  @include _768 {
    font-size: 12px;
  }

  & p {
    display: inline-block;
    color: var(--white);
  }

  & p,
  & a {
    align-items: center;
    gap: 10px;
  }

  & svg {
    max-width: 25px;
    min-height: 25px;
    margin-right: 8px;
  }

  & a {
    font-weight: 600;
    color: var(--sixth);
  }
}
</style>
