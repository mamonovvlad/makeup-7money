<template>
  <div class="details" v-if="detailsHide">
    <div class="details__wrapper stylish-wrapper">
      <div class="title__wrapper">
        <the-title tag="h1" class="subtitle">
          {{ course.title_ru }}
        </the-title>
        <the-current-time></the-current-time>
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
import TheInformation from "../sections/TheInformation.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheDetails",
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
    ...mapGetters(["courseText", "course", "detailsHide"]),
  },
  methods: {
    ...mapMutations(["trashClick"]),
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

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

  & .title__wrapper {
    @include _768 {
      gap: 15px;
      flex-direction: column;
      align-items: flex-start;
    }
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
  @include _768 {
    flex-direction: column;
  }

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
