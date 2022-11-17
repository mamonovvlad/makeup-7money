<template>
  <div class="public-information">
    <the-confetti></the-confetti>
    <p>
      <slot></slot>
    </p>
  </div>
</template>
<script>
import TheConfetti from "./TheConfetti.vue";

export default {
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
