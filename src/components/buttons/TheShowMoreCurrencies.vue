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
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #e8edf1;
  font-size: 14px;
  padding-top: 15px;
  color: #00b047;
  font-weight: 600;
}
</style>