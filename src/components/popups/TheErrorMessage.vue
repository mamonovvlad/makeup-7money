<template>
  <div class="error-message">
    <div class="wrapper">
      <icon-error-icon></icon-error-icon>
      <p class="description">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
import IconErrorIcon from "../icons/IconErrorIcon.vue";

export default {
  name: "TheErrorMessage",
  components: {
    IconErrorIcon,
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.error-message {
  position: fixed;
  bottom: 20px;
  right: -100%;
  opacity: 0;
  transition: all 200ms ease;

  & .wrapper {
    display: flex;
    column-gap: 8px;
    max-width: 335px;
    background: var(--red);
    padding: 10px;
    border-radius: var(--radius-four);
    color: var(--white);
    @include _768 {
      max-width: 300px;
    }
  }

  & svg {
    min-width: 20px;
    height: 20px;
  }

  &.active {
    right: 0;
    opacity: 1;
  }
}
</style>
