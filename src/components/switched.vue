<template>
  <input @click="switchPage"
    class="shadow_btn_white bg-background-main"
    type="checkbox"
  />
</template>

<script>
import vuex from 'vuex';
export default {
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
    switchPage() {
      return this.$store.dispatch('switchToggle')
    },
  },
};
</script>

