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
.public-information {
  position: relative;
  background: var(--black);
  text-align: center;
  padding: 5px;
  & p,
  & a {
    color: var(--white);
    display: inline-flex;
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
  }
}
</style>
