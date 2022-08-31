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
.show-more__currencies{
  font-size: 14px;
  padding-top: 5px;
  color: var(--primary);
  background: var(--seventh);
  font-weight: 600;
  width: 100%;
}
</style>