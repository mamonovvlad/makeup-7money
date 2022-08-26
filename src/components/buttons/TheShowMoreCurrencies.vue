<template>
  <button class="show-more__currencies">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ShowMoreCurrencies",
  methods:{
    toggle() {
      let currenciesList = this.$refs.currenciesList;
      let currenciesWrapper = this.$refs.currenciesWrapper;

      if (currenciesList.clientHeight === 535) {
        currenciesList.style.maxHeight = currenciesWrapper.clientHeight + "px";
        this.nameTitle = "Скрыть";
      } else {
        currenciesList.style.maxHeight = "";
        this.nameTitle = "Показать еще";
      }
    },
    hideButton() {
      let currenciesWrapper = this.$refs.currenciesWrapper;
      this.isShow = currenciesWrapper.clientHeight >= 535;
    },
  }
};
</script>

<style lang="scss">
.show-more__currencies{
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 14px;
  color: var(--primary);
  font-weight: 600;
}
</style>