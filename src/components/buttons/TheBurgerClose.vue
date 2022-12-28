<template>
  <button class="burger__close">
    <span></span>
    <span></span>
  </button>
</template>

<script>
export default {
  name: "TheBurgerClose",
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.burger__close {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  min-height: 50px;
  background: var(--transparent);
  border-radius: var(--radius-four);
  box-shadow: var(--shadow-secondary);
  transition: var(--transition);
  @include _768 {
    width: 40px;
    min-height: 40px;
  }

  &:hover {
    box-shadow: var(--shadow-secondary-inset);
  }

  & span {
    position: absolute;
    transform: rotate(135deg);
    width: 30px;
    height: 2px;
    background: #7f848c;
    @include _768 {
      width: 25px;
    }

    &:nth-child(2) {
      transform: rotate(45deg);
    }
  }
}
</style>
