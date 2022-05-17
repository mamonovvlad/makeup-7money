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

export default {
  name: "TheAnswers",
  data() {
    return {
      answers: {},
    };
  },
  computed: {
    getLanguage() {
      return document.getElementById("language").value;
    },
    getApiHost() {
      if (this.getLanguage === "en") {
        return "/en/";
      } else if (this.getLanguage === "ua") {
        return "/ua/";
      }
      return "";
    },
  },
  methods: {
    fetchAnswers() {
      const self = this;
      axios.get("http://proxy.local/" + this.getApiHost + "/json/faq").then((res) => {
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

<style>

</style>