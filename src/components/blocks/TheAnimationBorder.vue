<template>
  <div class="animation-border">
    <span class="border" :class="{ 'border--red': borderRed }"></span>
    <div class="box">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    borderRed: {
      type: Boolean,
      default: false,
    },
  },
  name: "TheAnimationBorder",
};
</script>

<style lang="scss">
.animation-border {
  position: relative;
  box-shadow: var(--shadow);
  border-radius: var(--radius-four);
  overflow: hidden;
  padding: 2px;

  & .border {
    position: absolute;
    animation: shine 3s linear infinite;
    top: 50%;
    left: 50%;
    height: 100%;
    width: 100%;
    transform: translate(-50%, -50%);
    background: linear-gradient(
      90deg,
      var(--seventh) 20%,
      var(--seventh) 40%,
      var(--primary) 50%,
      var(--primary) 55%,
      var(--seventh) 70%,
      var(--seventh)
    );
    background-size: 200% auto;
  }

  & .box {
    position: relative;
    border-radius: var(--radius-four);
    background: var(--seventh);
  }

  & .checkbox {
    padding: 10px;
  }

  .border--red {
    background: linear-gradient(
      90deg,
      var(--seventh) 20%,
      var(--seventh) 40%,
      var(--red) 50%,
      var(--red) 55%,
      var(--seventh) 70%,
      var(--seventh)
    );
    background-size: 200% auto;
  }
}
</style>
