<template>
  <section class="achievements" v-if="showHideBlock">
    <div class="wrapper stylish-wrapper">
      <div v-for="(item, idx) in items" :key="idx" class="block">
        <component :is="item.icon" />
        <div class="text">
          <the-title class="title" tag="h4">{{ item.title }}</the-title>
          <span>{{ item.description }}</span>
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

const items = [
  {
    title: "8766",
    description: "Человек нам доверяют",
    icon: "IconPeople",
  },
  {
    title: "7:03",
    description: "Среднее время обмена",
    icon: "IconTime",
  },
  {
    title: "116644",
    description: "Успешных обменов",
    icon: "IconSuccess",
  },
  {
    title: "689",
    description: "Отзывов BESTCHANGE",
    icon: "IconReviews",
  },
];
export default {
  name: "Achievements",
  data() {
    return {
      items,
    };
  },
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
  }

  & svg {
    color: var(--primary);
    width: 45px;
  }
}
</style>
