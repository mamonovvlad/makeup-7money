<template>
  <div class="preloader">
    <div class="loader"></div>
    <div class="description">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/utils/mixin";
.preloader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  background: var(--secondary-transparent);
  z-index: 7;

  & .loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--primary);
    animation: spin 2s linear infinite;

    &:before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: var(--primary);
      animation: spin 3s linear infinite;
    }

    &:after {
      content: "";
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: var(--primary);
      animation: spin 1.5s linear infinite;
    }
  }
  & .description {
    position: relative;
    text-align: center;
    top: 50%;
    color: var(--primary);
    font-size: 18px;
    margin-top: 10px;
    font-weight: 500;
    @include _576 {
      font-size: 16px;
    }
  }
}
</style>
