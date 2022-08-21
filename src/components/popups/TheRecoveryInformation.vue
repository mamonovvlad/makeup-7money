<template>
  <div class="recovery-information">
    <p>
      <slot></slot>
    </p>
    <div class="arrow"></div>
  </div>
</template>

<script>
export default {
  name: "TheRecoveryInformation",
};
</script>

<style lang="scss">
.recovery-information {
  position: absolute;
  bottom: 90%;
  background: var(--seventh);
  padding: 10px;
  border-radius: var(--radius-four);
  border: 1px solid var(--primary);
  display: block;
  z-index: 1;

  & .arrow {
    position: absolute;
    width: 16px;
    height: 10px;
    right: 20px;
    top: 100%;
    background: var(--seventh);
    z-index: 1;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: -1px;
      display: block;
      height: 12px;
      width: 1px;
      background: var(--primary);
    }

    &:before {
      transform: rotate(-45deg);
      left: 3px;
    }

    &:after {
      transform: rotate(45deg);
      right: 3px;
    }
  }
}
</style>
