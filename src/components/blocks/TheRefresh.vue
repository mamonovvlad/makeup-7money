<template>
  <button class="refresh">
    <icon-refresh class="icon"></icon-refresh>
  </button>
</template>

<script>
import IconRefresh from "../icons/IconRefresh.vue";

export default {
  name: "TheRefresh",
  components: {
    IconRefresh,
  },
};
</script>

<style lang="scss">
.refresh {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: -10px;
  background: var(--gradient);
  border: 4px solid var(--seventh);
  box-shadow: var(--shadow);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%);

  &:hover .icon {
    animation: rotation 1s linear infinite;
  }
}
</style>