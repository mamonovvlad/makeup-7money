<template>
  <div class="authorization password-recovery">
    <div class="wrapper">
      <button class="close" @click="$emit('close')">
        <icon-close></icon-close>
      </button>
      <h3>
        {{ $t("passwordRecovery") }}
      </h3>
      <p>{{ $t("recoveryText") }}</p>
      <form :action="$t('passwordRecoveryAction')" method="post">
        <input type="hidden" :value="csrfToken" :name="csrfParam" />
        <the-field name-type="mail" name-id="passwordRecovery_mail" name="PasswordResetRequestForm[email]"
                   name-placeholder="tolik.wwwww@ukr.net">
          <template #label>
            E-mail
          </template>
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
import IconClose from "../icons/IconClose.vue";
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
    IconClose,
    TheButton,
    TheField,
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