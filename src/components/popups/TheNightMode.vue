<template>
  <div class="night-mode popup-wrapper" v-if="isShow" ref="nightMode">
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
import { mapState } from "vuex";

export default {
  name: "TheNightMode",
  data() {
    return {
      // isShow: false,
    };
  },
  components: {
    TheClose,
    IconNightMode,
  },
  computed: {
    ...mapState(["time"]),

    isShow() {
      let a = this.dateFilter(this.time, "time");
      if (a >= "00:00" && a <= "09:00") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    dateFilter(value, format = "date") {
      const options = {};
      if (format.includes("time")) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.timeZone = "Europe/Moscow";
        options.timeZoneName = "short";
      }
      let time = new Intl.DateTimeFormat("ru-RU", options).format(
        new Date(value)
      );
      let dateArray = time.split("");
      dateArray.splice(time.indexOf("GMT"));
      return dateArray.join("");
    },
    isCloseNightMode() {
      this.$refs.nightMode.classList.add("d-none");
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.night-mode {
  align-items: center;

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
