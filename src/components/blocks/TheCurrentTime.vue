<template>
  <the-animation-border class="current-time">
    <div class="wrapper">
      <div class="time">
        <strong>{{ currentTime }}</strong>
        {{ $t("course") }}:
        <strong class="course">
          <transition name="fade" mode="out-in">
            <span v-if="updateText">{{ $t("updated") }}</span>
          </transition>
          {{ course.sell }} к {{ course.buy }}
        </strong>
      </div>
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
    updateText() {
      return this.currentTime < 60 && this.currentTime > 56;
    },
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
    position: relative;
    color: var(--quaternary);
    margin-left: auto;
    width: 100%;
    min-width: 86px;
    & span {
      position: absolute;
      background: var(--seventh);
      width: 100%;
    }
  }

  & .time {
    position: relative;
    font-size: 16px;
    color: var(--primary);
    column-gap: 10px;
  }
}
</style>
