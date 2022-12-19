<template>
  <div class="field">
    <label :for="nameId">
      <slot name="label"></slot>
    </label>
    <span class="form-group">
      <input
        v-if="!textarea && !select"
        @input="$emit('update:modelValue', $event.target.value)"
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
      <span class="help-block" :class="errorName">
        <slot name="error"></slot>
      </span>
    </span>
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
    errorName: {
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

  & .form-group {
    position: relative;
    padding: 10px 35px 10px 20px;
    box-shadow: var(--shadow-inset);
    border-radius: var(--radius-four);
    background-color: var(--seventh);
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow);
    }
  }

  & .icon {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 15px;
    background-size: cover;
    right: 10px;
  }

  & .has-error {
    background: var(--ninth);
    box-shadow: var(--shadow-inset-error);

    & .help-block {
      padding: 2px 4px;
    }

    &:hover {
      box-shadow: var(--shadow-error);
    }

    & input,
    & textarea,
    & select {
      &::placeholder {
        color: var(--red);
      }

      &:-webkit-autofill,
      &:-webkit-autofill:active,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:hover {
        -webkit-box-shadow: var(--shadow-inset-autofill-error) !important;
        -webkit-text-fill-color: var(--red) !important;
      }
    }
  }

  & textarea {
    height: 150px;
  }

  & input,
  & select {
    height: 30px;
  }

  & input,
  & textarea,
  & select {
    font-size: 16px;
    width: 100%;
    background: var(--transparent);
    color: var(--quaternary);
    @include _768 {
      font-size: 14px;
    }

    &::placeholder {
      color: var(--eighth);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:active,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:hover {
      -webkit-box-shadow: var(--shadow-inset-autofill) !important;
      -webkit-text-fill-color: var(--quaternary);
      -webkit-background-clip: text;
    }
  }

  & select {
    background-color: var(--seventh);
  }
}
</style>
