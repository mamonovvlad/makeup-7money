<template>
  <div class="details" v-if="detailsHide && calculateData">
    <div class="details__wrapper stylish-wrapper">
      <div class="title__wrapper">
        <the-title tag="h1" class="subtitle">
          {{ calculateData.course_h1 }}
        </the-title>
        <the-current-time></the-current-time>
      </div>
      <the-steps
        @button="trashClick"
        :show-button="true"
        :data-input="true"
      ></the-steps>
      <!--Форма-->
      <slot
        v-if="calculateData.min_buy_amount < calculateData.max_buy_amount"
        name="form"
      >
      </slot>
      <strong v-else class="warning">
        Выбранное вами направление обмена в данный момент недоступно
      </strong>
      <!--Конец Формы-->
    </div>
    <the-information
      v-if="calculateData.course_seo_text"
      v-html="calculateData.course_seo_text"
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
    ...mapGetters(["calculateData", "course", "detailsHide"]),
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

  & .warning {
    color: var(--quaternary);
  }

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

.commission {
  & strong {
    color: var(--quaternary);
  }
}

.items__wrapper {
  position: relative;
  display: flex;
  gap: 20px;
  @include _768 {
    flex-direction: column;
  }

  & .item {
    display: flex;
    flex-direction: column;
    position: relative;
    row-gap: 15px;
    max-width: 100%;
    width: 100%;

    &__lacks {
      & label {
        display: flex;
        justify-content: space-between;
      }
    }

    & .checkbox {
      display: flex;
      align-items: center;
      height: 100%;
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
