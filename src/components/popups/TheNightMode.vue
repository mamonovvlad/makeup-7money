<template>
  <div class="night-mode popup-wrapper" ref="nightMode">
    <div class="wrapper">
      <the-close @close="isCloseNightMode"> </the-close>
      <icon-night-mode></icon-night-mode>
      <div>
        <h3>Время работы с 9:00 до 00:00 часовой пояс (GMT+3)</h3>
        <p>
          И в данный момент наши операторы отдыхают и видят сладкие сны:) Вы
          можете оставить заявку, и как только начнется рабочий день - мы ее
          обработаем!!!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TheClose from "../buttons/TheClose.vue";
import IconNightMode from "../icons/IconNightMode.vue";

export default {
  name: "TheNightMode",
  components: {
    TheClose,
    IconNightMode,
  },
  methods: {
    isCloseNightMode() {
      this.$refs.nightMode.classList.add("d-none");
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.night-mode {
  & .wrapper {
    max-width: 1000px;
    display: flex;
    align-items: center;
  }

  & figure {
    max-width: 225px;
    margin-right: 20px;
    width: 100%;
    @include _576 {
      display: none;
    }
  }

  & h3 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
    color: var(--quaternary);
    @include _768 {
      font-size: 18px;
      margin-bottom: 8px;
    }
  }

  & p {
    font-size: 16px;
    color: var(--ternary);
    @include _768 {
      font-size: 14px;
    }
  }
}
</style>
