<template>
  <button class="close" @click="$emit('close')">
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
.close {
  position: absolute;
  width: 15px;
  top: 10px;
  right: 10px;
  background: transparent;
}
</style>