<template>
  <button class="button--big">
    <icon-arrow></icon-arrow>
  </button>
</template>

<script>
import IconArrow from "../icons/IconArrow.vue";
export default {
  name: "TheBigButton",
  components: {
    IconArrow,
  },
};
</script>

<style lang="scss">
.button--big {
  border-radius: var(--radius-four);
  min-width: 40px;
  height: 40px;
  transition: var(--transition);
  outline: none;
  box-shadow: var(--shadow);
  background: transparent;

  &:hover {
    box-shadow: var(--shadow-inset);
  }
}
</style>
