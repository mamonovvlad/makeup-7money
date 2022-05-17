<template>
  <div class="steps">

    <div class="step" :class="{active: dataInput}">
      <button v-if="showButton" @click="$emit('button')">
        <icon-arrow></icon-arrow>
      </button>
      <icon-data-input></icon-data-input>
      <span>{{ $t("dataInput") }}</span>
    </div>
    <div class="step" :class="{active: payment}">
      <icon-payment></icon-payment>
      <span>{{ $t("payment") }}</span>
    </div>
    <div class="step" :class="{active: completion}">
      <icon-completion></icon-completion>
      <span>{{ $t("completion") }}</span>
    </div>

  </div>
</template>

<script>
import IconDataInput from "../icons/IconDataInput.vue";
import IconPayment from "../icons/IconPayment.vue";
import IconCompletion from "../icons/IconCompletion.vue";
import IconArrow from "../icons/IconArrow.vue";

export default {
  props: {
    dataInput: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    completion: {
      type: Boolean,
      default: false,
    },
    showButton: {
      type: Boolean,
      default: false,
    },
  },
  name: "TheSteps",
  components: {
    IconDataInput,
    IconPayment,
    IconCompletion,
    IconArrow,
  },
};
</script>

<style lang="scss">
@import "../../source/scss/utils/mixin.scss";

.steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  background: var(--secondary);
  border-radius: var(--radius-eigh);
  padding: 15px 40px;
  overflow: hidden;
  @include _768 {
    padding: 15px 20px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 60px;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
    border: 2px dashed var(--ternary);
    z-index: 0;
    @include _768 {
      left: 20px;
      right: 20px;
      border-width: 1px;
    }
  }

  & .step {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 6px;
    background: var(--secondary);
    z-index: 1;
  }

  & span {
    font-size: 18px;
    white-space: nowrap;
    margin-left: 6px;
    @include _768 {
      display: none;
    }
  }

  & .active {
    & svg {
      color: var(--primary);
    }

    & span {
      color: var(--quaternary);
    }
  }

  & button {
    border-radius: var(--radius-four);
    min-width: 40px;
    height: 40px;
    transition: var(--transition);
    outline: none;
    box-shadow: var(--shadow);
    margin-right: 10px;
    background: transparent;

    &:hover {
      box-shadow: var(--shadow-inset);
    }
  }
}
</style>