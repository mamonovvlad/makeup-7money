<template>
  <div class="warning">
    <icon-info></icon-info>
    <strong>
      <slot>

      </slot>
    </strong>
  </div>
</template>

<script>
import IconInfo from "../icons/IconInfo.vue";

export default {
  name: "TheWarning",
  components: {
    IconInfo,
  },
};
</script>

<style lang="scss">
@import "../../source/scss/utils/mixin";

.warning {
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--secondary);
  border-radius: var(--radius-eigh);
  padding: 20px;
  @include _768 {
    flex-direction: column;
    text-align: center;
    padding: 15px;
    gap: 10px;
  }

  & svg {
    height: 50px;
    @include _768 {
      height: 30px;
    }
  }

  & strong {
    font-size: 16px;
    @include _768 {
      font-size: 14px;
    }
  }
}
</style>