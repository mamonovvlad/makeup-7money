<template>
  <div class="public-information">
    <the-confetti v-if="animationConfetti"></the-confetti>
    <p>
      <slot></slot>
    </p>
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
  }

  & svg {
    width: 26px;
  }

  & a {
    font-weight: 600;
  }
}
</style>
