<template>
  <div class="checkbox">
    <input
      :id="nameId"
      type="checkbox"
      @click="$emit('check')"

    />
    <label class="label" :for="nameId">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    nameId: {
      type: String,
      default: "",
    },
  },
  name: "TheCheckbox",
};
</script>

<style lang="scss">
.checkbox {
  max-width: max-content;
  width: 100%;

  & .label {
    display: flex;
    align-items: center;
    column-gap: 10px;

    &:before {
      content: "";
      min-width: 25px;
      height: 25px;
      background-color: var(--seventh);
      background-image: url("../../source/images/icon/check-grey.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 16px;
      box-shadow: var(--shadow);
      border-radius: var(--radius-four);
      transition: var(--transition);
    }

    & a {
      color: var(--primary);
      font-weight: 600;
    }
  }

  & input {
    display: none;
  }

  & input:checked + .label:before {
    box-shadow: var(--shadow-primary);
    background-color: var(--primary);
    background-image: url("../../source/images/icon/check.svg");
  }

}
</style>