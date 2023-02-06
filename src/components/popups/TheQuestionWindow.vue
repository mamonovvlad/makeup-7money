<template>
  <div class="question-window popup-wrapper">
    <div class="wrapper">
      <h4>{{ $t("areYouSure") }}</h4>
      <div class="buttons">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheQuestionWindow",
};
</script>

<style lang="scss">
.question-window {
  align-items: center;
  & .buttons {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    & button,
    & a {
      height: 40px;
    }
  }
}
</style>
