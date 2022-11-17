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

    // if (switched && switched.value > 0) {
    //   activeDisGive();
    //    } else {
    //   activeDisGet();
    // }
    // activeDisGet(setValue = false) {
    //   if (!document.getElementById("switched")) {
    //     return false;
    //   }
    //   if (setValue) document.getElementById("switched").value = 0;
    // },
    //
    // activeDisGive(setValue = false) {
    //   if (!document.getElementById("switched")) {
    //     return false;
    //   }
    //   if (setValue) document.getElementById("switched").value = 1;
    // },
    //
    // toggleSwitch() {
    //   if (!switched) return;
    //   if (switched.value > 0) {
    //     document.getElementById("switched").value = 0;
    //   } else {
    //     document.getElementById("switched").value = 1;
    //   }
    // },
  },
  mounted() {
    this.editValue();
  },
};
</script>
