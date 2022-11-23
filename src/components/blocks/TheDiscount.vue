<template>
  <the-switched
    @toggleText="toggleText"
    @toggleInput="toggleInput"
    :number="number"
    class="switched--mobile"
  >
    <template #first-title>{{ $t("getDiscount") }}</template>
    <template #second-title>{{ $t("giveDiscount") }}</template>
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
    toggleText(idx, setValue = false) {
      if (setValue) {
        this.number = idx;
        this.switchedValue();
      }
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
      if (switched && switched.value > 0) {
        this.toggleText(1);
      } else {
        this.toggleText(0);
      }
    },
  },
  mounted() {
    this.editValue();
  },
};
</script>
