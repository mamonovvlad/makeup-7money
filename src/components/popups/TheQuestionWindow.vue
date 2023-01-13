<template>
  <div class="question-window popup-wrapper">
    <div class="wrapper">
      <h4>Вы уверены?</h4>
      <div class="buttons">
        <button type="submit" class="button">Да</button>
        <button type="button" @click="$emit('windowHide')" class="button">
          Нет
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isHide: {
      type: Boolean,
    },
  },
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
    & button {
      height: 40px;
    }
  }
}
</style>
