<template>
  <span class="animate-arrow">
    <icon-arrow-long></icon-arrow-long>
    <span>menu</span>
  </span>
</template>

<script>
import IconArrowLong from "../icons/IconArrowLong.vue";
export default {
  name: "TheAnimateArrow",
  components: {
    IconArrowLong,
  },
};
</script>

<style lang="scss">
.animate-arrow {
  position: absolute;
  width: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--primary);
  animation: animate 2s ease-in infinite;
  & span {
    margin-top: 14px;
    transform: rotate(90deg);
    display: block;
  }
}
@keyframes animate {
  0% {
    top: -96px;
  }
  50% {
    top: -84px;
  }
  100% {
    top: -96px;
  }
}
</style>
