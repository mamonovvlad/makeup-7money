<template>
  <button class="show-more__currencies">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ShowMoreCurrencies",
};
</script>

<style lang="scss">
.show-more__currencies {
  padding: 8px;
  font-size: 14px;
  color: var(--primary);
  font-weight: 500;
  width: 100%;
  transition: var(--transition);
  border-radius: 0 0 var(--radius-four) var(--radius-four);
  &:hover {
    background: var(--primary);
    color: var(--secondary);
  }
}
</style>
