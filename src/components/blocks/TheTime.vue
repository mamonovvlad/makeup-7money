<template>
  <div class="time">
    <Transition name="slide-up">
      <div class="animate-block" v-if="isShow">
        <p>
          {{ $t("schedule") }}
          <span>{{ $t("workingHours") }}</span>
        </p>
        {{ $t("time") }}
        <span>{{ dateFilter(time, "time") }}</span>
      </div>
      <p v-else class="animate-block description">
        <template v-if="toggleText">Сейчас мы работаем</template>
        <template v-else>Сейчас мы не работаем</template>
      </p>
    </Transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "TheTime",
  data() {
    return {
      isShow: true
    };
  },
  computed: {
    ...mapState(["time", "interval"]),
    toggleText() {
      let a = this.dateFilterText(this.time, "time");
      if (a >= "00:00" && a <= "09:00") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapMutations(["updateTime"]),
    dateFilterText(value, format = "date") {
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

    dateFilter(value, format = "date") {
      const options = {};
      if (format.includes("time")) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.timeZone = "Europe/Moscow";
        options.timeZoneName = "short";
      }
      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    },
    showText() {
      setInterval(() => {
        this.isShow === true ? (this.isShow = false) : (this.isShow = true);
      }, 10000);
    }
  },
  mounted() {
    this.updateTime();
    this.showText();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.time {
  display: flex;
  align-items: center;
  line-height: 140%;
  @include _1200 {
    font-size: 12px;
  }
  @include _576 {
    position: absolute;
    top: -46px;
    width: 100%;
    height: 100%;
  }

  & .animate-block {
    position: absolute;
  }

  & span {
    color: var(--quaternary);
  }

  & .description {
    font-size: 16px;
    font-weight: 500;
    color: var(--quaternary);
    @include _768 {
      font-size: 14px;
    }
  }
}
</style>
