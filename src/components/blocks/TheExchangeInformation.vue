<template>
  <div class="exchange-information">
    <icon-info></icon-info>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
import IconInfo from "../icons/IconInfo.vue";

export default {
  name: "TheExchangeInformation",
  components: {
    IconInfo,
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";
.exchange-information {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--quaternary);
  line-height: 140%;

  & figure {
    max-width: 45px;
    min-width: 45px;
    margin-right: 15px;
    @include _768 {
      display: none;
    }
    & svg {
      width: 100%;
    }
  }
}
</style>
