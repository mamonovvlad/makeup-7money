<template>
  <div class="question-information">
    <icon-question></icon-question>
    <the-recovery-information>
      {{ $t("questionInfo") }}
    </the-recovery-information>
  </div>
</template>

<script>
import TheRecoveryInformation from "../popups/TheRecoveryInformation.vue";
import IconQuestion from "../icons/IconQuestion.vue";

export default {
  name: "TheQuestionBlock",
  components: {
    IconQuestion,
    TheRecoveryInformation,
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.question-information {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  & svg {
    cursor: pointer;
    color: var(--quaternary);
    width: 25px;

    &:hover {
      & + .recovery-information {
        display: block;
      }
    }
  }

  & .recovery-information {
    display: none;
    right: -12px;
    bottom: 55px;
    width: 300px;
    font-size: 12px;
    @include _768 {
      width: 270px;
    }
  }
}
</style>
