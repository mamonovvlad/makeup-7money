<template>
  <the-switched @toggleText="toggleText" @toggleInput="toggleInput" :number="number" class="switched--mobile">
    <template #first-title>Учитывать скидку в сумме “Я получаю”</template>
    <template #second-title>Учитывать скидку в сумме “Я отдаю”</template>
  </the-switched>
</template>

<script>
import TheSwitched from "../buttons/TheSwitched.vue";

let switched = document.getElementById("switched");
export default {
  name: "TheDiscount",
  data() {
    return {
      number: 0,
      switched,
    };
  },
  components: {
    TheSwitched,
  },
  methods: {
    toggleText(idx) {
      this.number = idx;
      this.switchedValue();
    },
    toggleInput() {
      if (this.number === 0) {
        this.number = 1;
      } else {
        this.number = 0;
      }
      this.switchedValue();
    },
    switchedValue() {
      switched.value = this.number;
    },
    editValue() {
      this.number = Number(switched.value);
    },
  },
  mounted() {
    this.editValue();
  },
};
</script>

<style>

</style>