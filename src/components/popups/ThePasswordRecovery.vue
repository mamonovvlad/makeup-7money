<template>
  <div class="popup-wrapper password-recovery">
    <div class="wrapper">
      <the-close @close="hideBlock"></the-close>
      <h3>
        {{ $t("passwordRecovery") }}
      </h3>
      <p>{{ $t("recoveryText") }}</p>
      <form :action="$t('passwordRecoveryAction')" method="post">
        <input type="hidden" :value="csrfToken" :name="csrfParam" />

        <the-field
          name-type="mail"
          name-id="passwordRecovery_mail"
          name="PasswordResetRequestForm[email]"
          name-placeholder="user@gmail.com"
        >
          <template #label> E-mail</template>
        </the-field>
        <the-button tag="button" type="submit">
          <template #name>
            {{ $t("send") }}
          </template>
        </the-button>
      </form>
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
  mounted() {
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
  },
};
</script>

<style lang="scss">
.password-recovery {
  & .wrapper {
    max-width: 425px;
  }

  & h3 {
    font-weight: 500;
    font-size: 24px;
    color: var(--quaternary);
    margin-bottom: 10px;
  }

  & .button {
    margin-top: 20px;
    width: 100%;
  }

  & form {
    margin-top: 20px;
  }
}
</style>
