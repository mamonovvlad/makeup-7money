<template>
  <the-animation-border class="current-time">
    <div class="wrapper">
      <strong class="time">{{ currentTime }}</strong>
      Курс:
      <strong class="course">{{ course.sell }} к {{ course.buy }}</strong>
    </div>
  </the-animation-border>
</template>
<script>
import TheAnimationBorder from "./TheAnimationBorder.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheCurrentTime",
  components: {
    TheAnimationBorder,
  },
  computed: {
    ...mapGetters(["currentTime", "course"]),
  },
  methods: {
    ...mapMutations(["startTimer", "stopTimer", "callbackTimerFinish"]),
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer();
        this.startTimer();
        this.callbackTimerFinish();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.current-time {
  max-width: max-content;
  width: 100%;
  @include _768 {
    align-self: flex-end;
  }

  & .wrapper {
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 6px 10px;
  }

  & .course {
    color: var(--quaternary);
    margin-left: auto;
  }

  & .time {
    font-size: 16px;
    color: var(--primary);
  }
}
</style>
