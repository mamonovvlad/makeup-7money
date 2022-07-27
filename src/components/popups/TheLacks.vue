<template>
  <div class="lacks">
    <span>Не хватает</span>
    <div class="popup-wrapper">
      <p>Максимальная сумма получения</p>
      <strong>0.00057 Bitcoin</strong>
      <the-button tag="button">
        <template #name>Не Хватает ?</template>
      </the-button>
    </div>
  </div>
</template>

<script>
import TheButton from "../buttons/TheButton.vue";

export default {
  name: "TheLacks",
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    TheButton,
  },
};
</script>

<style lang="scss">
.lacks {
  transition: var(--transition);
  .popup-wrapper {
    position: absolute;
    bottom: 25px;
    right: 0;
    padding: 20px;
    opacity: 0;
    z-index: -5;

    & button {
      font-size: 14px;
      height: 35px;
      margin-top: 10px;
    }
  }

  span {
    padding-top: 10px;
    color: var(--primary);
    font-weight: 600;
    cursor: pointer;
  }

  &:hover {
    & .popup-wrapper {
      opacity: 1;
      z-index: 2;
    }
  }
}
</style>
