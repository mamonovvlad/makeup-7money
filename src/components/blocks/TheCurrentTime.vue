<template>
  <the-animation-border class="current-time">
    <div class="wrapper">
      <strong class="time">{{ currentTime }}</strong>
      Курс:
      <strong class="course">{{ courseSell }} к {{ courseBuy }}</strong>
    </div>
  </the-animation-border>
</template>

<script>
import TheAnimationBorder from "./TheAnimationBorder.vue";

export default {
  props: {
    courseSell: {
      type: [Number, String],
      default: 0,
    },
    courseBuy: {
      type: [Number, String],
      default: 0,
    },
    currentTime: {
      type: [Number, String],
      default: 0,
    },
  },
  name: "TheCurrentTime",
  components: {
    TheAnimationBorder,
  },
};
</script>

<style lang="scss">
.current-time {
  max-width: max-content;
  width: 100%;
  & .wrapper{
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