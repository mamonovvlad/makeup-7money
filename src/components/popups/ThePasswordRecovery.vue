<template>
  <div class="authorization popup-wrapper password-recovery">
    <div class="wrapper">
      <the-close @close="hideBlock"></the-close>
      <h3>
        {{ $t("passwordRecovery") }}
      </h3>
      <p>{{ $t("recoveryText") }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheClose from "../buttons/TheClose.vue";
import TheButton from "../buttons/TheButton.vue";
import TheField from "../blocks/TheField.vue";

export default {
  name: "ThePasswordRecovery",
  data() {
    return {
      csrfToken: null,
      csrfParam: null,
    };
  },
  components: {
    TheClose,
    TheButton,
    TheField,
  },
  methods: {
    hideBlock() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.password-recovery {
  max-width: 425px;

  & h3 {
    font-weight: 600;
    font-size: 24px;
    color: var(--quaternary);
    margin-bottom: 10px;
  }

  & form {
    margin-top: 20px;
  }
}
</style>