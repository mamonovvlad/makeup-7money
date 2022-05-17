<template>
  <div class="authorization">
    <vuescroll class="scroll_box scroll">
      <div class="authorization_box shadow_btn_white bg-background-main">
        <div class="close" @click="close_modal">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.0206 0.707107C12.4111 1.09763 12.4111 1.7308 12.0206 2.12132L2.12109 12.0208C1.73056 12.4113 1.0974 12.4113 0.706875 12.0208C0.316351 11.6303 0.31635 10.9971 0.706875 10.6066L10.6064 0.707107C10.9969 0.316582 11.6301 0.316582 12.0206 0.707107Z"
              fill="#7F848C"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.707932 0.707107C1.09846 0.316582 1.73162 0.316582 2.12215 0.707107L12.0216 10.6066C12.4122 10.9971 12.4122 11.6303 12.0216 12.0208C11.6311 12.4113 10.998 12.4113 10.6074 12.0208L0.707932 2.12132C0.317408 1.7308 0.317408 1.09763 0.707932 0.707107Z"
              fill="#7F848C"
            />
          </svg>
        </div>
        <div class="authorization_toggle text-copy-main">
          <p @click="entrance" :class="{ active_entrance }">
            {{ $t("logIn") }}
          </p>
          <switched :class="{ active_registration }"></switched>
          <p @click="registration" :class="{ active_registration }">
            {{ $t("signUp") }}
          </p>
        </div>
        <entrance
          v-if="active_entrance"
          @open_password_recovery="$emit(`open_password_recovery`)"
        ></entrance>
        <registration v-show="active_registration"></registration>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import vuex from "vuex";
export default {
  components: {
    vuescroll,
  },
  computed: {
    show_entrance() {
      return this.$store.getters.show_entrance;
    },
    active_entrance() {
      return this.$store.getters.active_entrance;
    },
    active_registration() {
      return this.$store.getters.active_registration;
    },
    account_active() {
      return this.$store.getters.account_active;
    },
  },
  methods: {
    close_modal() {
      return this.$store.dispatch("modalHide");
    },
    entrance() {
      return this.$store.dispatch("entranceShow");
    },
    registration() {
      return this.$store.dispatch("registrationShow");
    },
  },
};
</script>
