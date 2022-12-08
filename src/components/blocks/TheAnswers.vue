<template>
  <div class="answers__list">
    <div
      v-for="(faq, i) in faqs"
      :key="i"
      :class="{ active: i === index }"
      class="answer"
    >
      <div class="answer__title" @click="openAnswer(i)">
        <h2 v-if="lang === 'en'">{{ faq.question_en }}</h2>
        <h2 v-else-if="lang === 'ua'">{{ faq.question_ua }}</h2>
        <h2 v-else>{{ faq.question_ru }}</h2>
        <button class="arrow">
          <icon-arrow></icon-arrow>
        </button>
      </div>
      <div
        v-if="lang === 'en'"
        class="answer__text"
        v-show="i === index"
        v-html="faq.answer_en"
      ></div>
      <div
        v-else-if="lang === 'ua'"
        class="answer__text"
        v-show="i === index"
        v-html="faq.answer_ua"
      ></div>
      <div
        v-else
        class="answer__text"
        v-show="i === index"
        v-html="faq.answer_ru"
      ></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import IconArrow from "../icons/IconArrow.vue";

export default {
  name: "TheAnswers",
  data() {
    return {
      faqs: [],
      isShow: false,
      index: -1,
    };
  },
  components: {
    IconArrow,
  },
  computed: {
    ...mapGetters(["getLang", "proxy"]),
    lang() {
      return this.getLang.split("/").join("");
    },
  },
  methods: {
    openAnswer(i) {
      this.index = i;
    },
    fetchAnswers() {
      const self = this;
      axios.get(this.proxy + this.getLang + "/json/faq").then((res) => {
        self.faqs = res.data.faqs;
      });
    },
  },
  mounted() {
    this.fetchAnswers();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";
.answers__list {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;

  & .answer {
    position: relative;
    padding: 20px;
    border-radius: var(--radius-eigh);
    cursor: pointer;
    box-shadow: var(--shadow);
    transition: var(--transition);

    &__title {
      position: relative;
      padding-right: 26px;
      & h2 {
        @include _768 {
          font-size: 16px;
        }
      }
    }
    &__text {
      margin-top: 10px;
      font-size: 16px;
      @include _768 {
        font-size: 14px;
      }
    }
  }

  & .arrow {
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(-90deg);
    width: 25px;
    height: 25px;

    & svg {
      transition: var(--transition);
    }
  }
  & .active {
    box-shadow: var(--shadow-inset);
    color: var(--quaternary);

    & .arrow svg {
      transform: rotate(180deg);
    }
  }
}
</style>
