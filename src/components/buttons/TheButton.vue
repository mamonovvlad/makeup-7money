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

$fuschia: #ff0081;
$button-bg: $fuschia;
$button-text-color: #fff;
$baby-blue: #f8faff;

.button-inline {
  display: inline-flex;
  width: auto;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 4px;
  color: var(--secondary);
  background: var(--gradient);
  @include _768 {
    font-size: 12px;
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  column-gap: 10px;
  font-size: 18px;
  height: 50px;
  font-weight: 500;
  color: var(--sixth);
  background: var(--gradient);
  border-radius: var(--radius-four);
  padding: 0 10px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: var(--shadow-primary);
  @include _1200 {
    font-size: 16px;
  }
  @include _768 {
    font-size: 14px;
  }
  &:hover {
    box-shadow: var(--shadow-primary-inset);
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
    box-shadow: var(--shadow);
    transition: var(--transition);
    &:hover,
    &:active {
      box-shadow: var(--shadow-inset);
    }
  }

  &--border {
    color: var(--primary);
    background: transparent;
    border: 2px solid var(--primary);
  }
}

.disabled {
  position: relative;
  background: var(--twelfth);
  box-shadow: var(--shadow);
  color: var(--quaternary);
  cursor: not-allowed;
  //&:before {
  //  content: "";
  //  position: absolute;
  //  width: 100%;
  //  height: 100%;
  //  background: transparent;
  //  z-index: 3;
  //}
  &:hover {
    box-shadow: var(--shadow-inset);
  }
  &:active {
    box-shadow: var(--shadow-inset);
  }
}
</style>
