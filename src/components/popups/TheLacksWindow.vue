<template>
  <div class="lacks-window  popup-wrapper">
    <div class="wrapper">
      <the-close @close="hideBlock"></the-close>
      <the-title class="subtitle" tag="h2">{{ $t("lacks") }}</the-title>
      <p>{{ $t("lacksWindow_first") }}</p>
      <p>{{ $t("lacksWindow_second") }}</p>
      <p>{{ $t("lacksWindow_third") }}</p>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
import TheTitle from "../blocks/TheTitle.vue";
import TheClose from "../buttons/TheClose.vue";

export default {
  name: "TheLacksWindow",
  components: {
    TheTitle,
    TheClose,
  },
  methods: {
    hideBlock() {
      this.$emit("close");
    },
  },

};
</script>

<style lang="scss">
.lacks-window {
  & .items__wrapper {
    align-items: flex-end;

    & button {
      width: 100%;
    }
  }

  & .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 30px;
    overflow: hidden;
    background: var(--seventh);
  }

  & .form {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
}
</style>