<template>
  <section class="achievements" v-if="showHideBlock">
    <div class="wrapper stylish-wrapper">
      <div class="block">
        <icon-people></icon-people>
        <div class="text">
          <slot name="people"></slot>
        </div>
      </div>
      <div class="block">
        <icon-success></icon-success>
        <div class="text">
          <slot name="success"></slot>
        </div>
      </div>
      <div class="block">
        <icon-time></icon-time>
        <div class="text">
          <slot name="time"></slot>
        </div>
      </div>
      <div class="block">
        <icon-reviews></icon-reviews>
        <div class="text">
          <slot name="reviews"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import IconPeople from "../icons/IconPeople.vue";
import IconSuccess from "../icons/IconSuccess.vue";
import IconTime from "../icons/IconTime.vue";
import IconReviews from "../icons/IconReviews.vue";
import TheTitle from "../blocks/TheTitle.vue";
import { mapGetters } from "vuex";

export default {
  name: "Achievements",
  computed: {
    ...mapGetters(["blockHide"]),
    showHideBlock() {
      if (window.innerWidth > 992) {
        return this.blockHide;
      }
    },
  },
  components: {
    IconReviews,
    IconSuccess,
    IconTime,
    IconPeople,
    TheTitle,
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.achievements {
  & .wrapper {
    display: grid;
    overflow: hidden;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  & .block,
  svg,
  h4,
  span {
    transition: var(--transition);
  }

  & .block {
    display: flex;
    align-items: center;
    padding: 30px;
    @include _1200 {
      padding: 20px;
    }
    &:hover {
      background: var(--primary);

      & svg,
      h4,
      span {
        color: var(--sixth);
      }
    }
  }

  & .text {
    margin-left: 20px;
    @include _1200 {
      margin-left: 14px;
    }
  }

  & svg {
    color: var(--primary);
    width: 45px;
  }
}
</style>
