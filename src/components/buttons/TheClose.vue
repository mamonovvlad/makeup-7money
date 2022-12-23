<template>
  <button class="button-close" @click="$emit('close')">
    <icon-close></icon-close>
  </button>
</template>

<script>
import IconClose from "../icons/IconClose.vue";

export default {
  name: "TheClose",
  components: {
    IconClose,
  },
};
</script>

<style lang="scss">
.button-close {
  position: absolute;
  width: 14px;
  top: 8px;
  right: 8px;
  background: transparent;
}
</style>
