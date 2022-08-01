<template>
  <div>
    <!--    v-for="(faq, i) in dataFaq.faqs"-->
    <!--    :key="i"-->
    <!--    @click="toggleopen(i)"-->
    <!--    :class="{ open : i === answersNum }"-->
    <!--    class=""-->
    <!--  >-->
    <!--    <div-->
    <!--      class="accordion_title"-->
    <!--      v-html="faq[dataFaq.field_question]"-->
    <!--    ></div>-->
    <!--    <div-->
    <!--      class=""-->
    <!--      v-html="faq[dataFaq.field_answer]"-->
    <!--    ></div>-->
    <h1>6543</h1>
    {{ answers }}
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "TheAnswers",
  data() {
    return {
      answers: {},
    };
  },
  computed: {
    ...mapGetters(["getLang"]),
  },
  methods: {
    fetchAnswers() {
      const self = this;
      axios
        .get("http://proxy.local/" + this.getLang + "/json/faq")
        .then((res) => {
          self.answers = res.data;
        });
    },
  },
  mounted() {
    if (document.querySelector(".answers")) {
      this.fetchAnswers();
    }
  },
};
</script>

<style></style>
