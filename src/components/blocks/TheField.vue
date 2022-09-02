<template>
  <div class="field">
    <label :for="nameId">
      <slot name="label"></slot>
    </label>
    <span class="form-group">
      <input
        v-if="!textarea && !select"
        @input="$emit('update:modelValue', $event.target.value)"
        class="field"
        :value="modelValue"
        :id="nameId"
        :type="nameType"
        :name="name"
        :placeholder="namePlaceholder"
        :required="required"
        :autocomplete="autocomplete"
        :aria-invalid="ariaInvalid"
        :aria-required="ariaRequired"
      />
      <select
        v-else-if="select"
        class="field"
        :id="nameId"
        :name="name"
        :required="required"
      >
        <slot> </slot>
      </select>
      <textarea
        v-else-if="textarea"
        class="field"
        :id="nameId"
        :name="name"
        :placeholder="namePlaceholder"
        :required="required"
        :aria-invalid="ariaInvalid"
        :aria-required="ariaRequired"
        :value="modelValue"
      >
      </textarea>
      <slot name="icon"></slot>
    </span>
    <transition name="animation-from-right">
      <div v-show="this.$slots.error && showError" class="help-block">
        <slot name="error"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TheInput",
  props: {
    showError: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Boolean,
      default: false,
    },
    namePlaceholder: {
      type: String,
    },
    nameId: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    name: {
      type: String,
    },
    nameType: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
    ariaInvalid: {
      type: Boolean,
    },
    ariaRequired: {
      type: Boolean,
    },
    autocomplete: {
      type: String,
      default: "off",
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.field {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
  max-width: 100%;
  min-width: 225px;
  position: relative;

  & label {
    position: relative;
    font-size: 14px;
    color: var(--quaternary);
    font-weight: 500;
  }

  & .form-group{
    position: relative;

    & span {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      transform: translateY(-50%);
      background-size: cover;
      right: 10px;
    }
  }

  & input,
  & textarea,
  & select {
    box-shadow: var(--shadow-inset);
    border-radius: var(--radius-four);
    background-color: var(--seventh);
    font-size: 16px;
    width: 100%;
    padding: 16px 35px 16px 20px;
    color: var(--quaternary);
    transition: var(--transition);
    @include _768 {
      font-size: 14px;
    }

    &::placeholder {
      color: var(--ternary);
    }

    &:hover {
      box-shadow: var(--shadow);
    }
  }

  &-error {

  }
}

.help-block{
  color: var(--red);
  position: absolute;
  left: 6px;
  bottom: -15px;
  font-size: 12px;
}
</style>
