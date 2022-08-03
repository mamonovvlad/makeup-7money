<template>
  <div class="details">
    <div class="details__wrapper stylish-wrapper">
      <div class="title__wrapper">
        <the-title tag="h1" class="subtitle">
          {{ course.title_ru }}
        </the-title>
        <the-current-time
          :current-time="currentTime"
          :course-sell="course.sell"
          :course-buy="course.buy"
        >
        </the-current-time>
      </div>
      <the-steps
        @button="trashClick"
        :show-button="true"
        :data-input="true"
      ></the-steps>
      <!--Форма-->
      <form action class="form-exchange">
        <input :name="csrfParam" :value="csrfToken" type="hidden" />
        <slot></slot>
      </form>
      <!--Конец Формы-->
    </div>
    <the-information
      v-if="courseText.course_seo_text"
      v-html="courseText.course_seo_text"
    >
    </the-information>
  </div>
</template>

<script>
import TheSteps from "./TheSteps.vue";
import TheTitle from "./TheTitle.vue";
import TheCurrentTime from "./TheCurrentTime.vue";
import TheInformation from "./TheInformation.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheDetails",
  props: {
    currentTime: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      csrfToken: null,
      csrfParam: null,
    };
  },
  components: {
    TheInformation,
    TheCurrentTime,
    TheTitle,
    TheSteps,
  },
  computed: {
    ...mapGetters(["courseText", "course"]),
  },
  methods: {
    ...mapMutations(["trashClick"]),
  },
};
</script>

<style lang="scss">
.details {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  flex: 1;

  & .details__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 20px;
  }

  & .stylish-wrapper {
    overflow: hidden;
  }
}

.form-exchange {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  & .button {
    width: 100%;
  }
}

.items__wrapper {
  display: flex;
  gap: 20px;

  & .item {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    max-width: 100%;
    width: 100%;

    &__lacks {
      & label {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  & .min__max {
    display: flex;
    justify-content: space-between;

    & strong {
      color: var(--quaternary);
    }
  }
}
</style>
