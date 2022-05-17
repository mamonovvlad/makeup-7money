<template>
  <div class="buttons">
    <the-authorization></the-authorization>
    <the-button tag="button" @click.native="openAuthorization">
      <template #name> Зарегистрироваться</template>
    </the-button>
    <a href="/src/static">Вернуться на главную</a>
  </div>
</template>

<script>
import TheButton from "./TheButton.vue";
import TheAuthorization from "../popups/TheAuthorization.vue";

export default {
  name: "TheErrorButtons",
  data() {
    return {
      isAuthorization: {
        index: -1,
        isOpen: false,
      },
    };
  },
  components: {
    TheButton,
    TheAuthorization,
  },
  methods: {
    openAuthorization() {
      this.isAuthorization.isOpen = true;
      this.isAuthorization.index = 1;
    },
  },
  provide() {
    return {
      isAuthorization: this.isAuthorization,
    };
  },
};
</script>

<style scoped>

</style>