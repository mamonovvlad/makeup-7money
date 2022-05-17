<template>
  <div class="verified" v-show="show_modal_verified">
    <div class="verified_box shadow_btn_white bg-background-main">
      <div class="close" @click="show_modal_verified = false">
        <svg
          fill="none"
          height="13"
          viewBox="0 0 13 13"
          width="13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M12.0206 0.707107C12.4111 1.09763 12.4111 1.7308 12.0206 2.12132L2.12109 12.0208C1.73056 12.4113 1.0974 12.4113 0.706875 12.0208C0.316351 11.6303 0.31635 10.9971 0.706875 10.6066L10.6064 0.707107C10.9969 0.316582 11.6301 0.316582 12.0206 0.707107Z"
            fill="#7F848C"
            fill-rule="evenodd"
          />
          <path
            clip-rule="evenodd"
            d="M0.707932 0.707107C1.09846 0.316582 1.73162 0.316582 2.12215 0.707107L12.0216 10.6066C12.4122 10.9971 12.4122 11.6303 12.0216 12.0208C11.6311 12.4113 10.998 12.4113 10.6074 12.0208L0.707932 2.12132C0.317408 1.7308 0.317408 1.09763 0.707932 0.707107Z"
            fill="#7F848C"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <p class="verified_title text-copy-descr">{{ $t("verified") }}</p>
      <p class="verified_descr">{{ $t("verifiedText") }}</p>
      <div class="verified_confirm">
        <input :name="csrfParam" :value="csrfToken" type="hidden" />
        <div class="verified-block">
          <input
            id="verified_input"
            class="confirm_inp bg-background-main shadow_btn_white_active"
            placeholder="121412"
            type="number"
          />
          <p class="help-block help-verified-code dn">
            {{ $t("verificationСode") }}
          </p>
        </div>
        <button
          class="green_btn text-copy-btngreen"
          @click="checkCodeExmo"
        >
          {{ $t("confirm") }}
        </button>
      </div>
      <small class="resend_email_result text-copy-green dn"
      >{{ $t("codeMessage") }}</small
      >
      <a class="verified_small" href="#" @click="resendEmailExmo"
      >{{ $t("emailNotReceived") }}</a
      >
      <p class="text-copy-descr sending_code dn">
        {{ $t("sendingCode") }} <span>{{ verifiedTime }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheVerified",
};
</script>

<style scoped>

</style>