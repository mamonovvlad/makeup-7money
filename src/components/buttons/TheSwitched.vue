<template>
  <div class="switched">
    <span @click="$emit('toggleText', 0)" :class="{active: number === 0}">
      <slot name="first-title"></slot>
    </span>
    <input
      @click="$emit('toggleInput')"
      :class="{'active--left':number === 0,'active--right':number === 1}"
      type="checkbox"
    />
    <span @click="$emit('toggleText', 1)"  :class="{active: number === 1}">
       <slot name="second-title"></slot>
    </span>

  </div>
</template>

<script>
export default {
  props: {
    number:{
      type: Number,
      default: 0
    },
  },
  name: "TheSwitched",
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.switched {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: normal;

  & span {
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    @include _768 {
      font-size: 14px;
    }
  }

  & input {
    position: relative;
    width: 50px;
    height: 25px;
    border-radius: var(--radius-four);
    transition: var(--transition);
    background-color: var(--seventh);
    box-shadow: var(--shadow);
    -webkit-appearance: none;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0 15px;

    &:before {
      content: '';
      position: absolute;
      width: 19px;
      height: 19px;
      border-radius: var(--radius-four);
      transform: translate(0px, -50%);
      background: var(--gradient);
      transition: var(--transition);
    }

  }

  & .active {
    color: var(--quaternary);

    &--left:before {
      left: 3px;
      top: 50%;
    }

    &--right:before {
      left: 27px;
      top: 50%;
    }
  }

  &--mobile {
    @include _1200 {
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      padding-left: 50px;
      height: 80px;
    }

    & input {
      @include _1200 {
        position: absolute;
        left: 0;
        margin: 0;
        width: 25px;
        height: 80px;
      }

      &:before {
        @include _1200 {
          transform: translate(-50%, 0);
          height: 30px;
        }
      }
    }

    & .active {
      &--left:before {
        @include _1200 {
          left: 50%;
          top: 3px;
        }
      }

      &--right:before {
        @include _1200 {
          left: 50%;
          top: 47px;
        }
      }
    }
  }
}
</style>