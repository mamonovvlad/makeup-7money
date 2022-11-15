<template>
  <component :is="getTag" class="button">
    <slot name="image"></slot>
    <slot name="name"></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  computed: {
    getTag() {
      return this.tag;
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/utils/mixin";

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  column-gap: 10px;
  font-size: 18px;
  height: 50px;
  font-weight: 600;
  color: var(--sixth);
  background: var(--gradient);
  border-radius: var(--radius-four);
  padding: 0 10px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  @include _1200 {
    font-size: 16px;
  }
  @include _768 {
    font-size: 14px;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--white);
    transform: skewX(-20deg);
    opacity: 0;
    transition: var(--transition);
  }

  &:hover:after {
    width: 30px;
    opacity: 0.2;
    animation: button 2s infinite ease;
  }

  &:active {
    box-shadow: var(--shadow-primary-inset);
  }

  & svg,
  & img {
    height: 100%;
  }

  &--transparent {
    background: transparent;
    border: 2px solid var(--ternary);
    color: var(--ternary);
  }

  &--border {
    color: var(--primary);
    background: transparent;
    border: 2px solid var(--primary);
  }
}

.disabled {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    cursor: not-allowed;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
