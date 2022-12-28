<template>
  <p>
    {{ $t("time") }}
    <span>{{ dateFilter(time, "time") }}</span>
  </p>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "TheTime",
  computed: {
    ...mapState(["time", "interval"]),
  },
  methods: {
    ...mapMutations(["updateTime"]),
    dateFilter(value, format = "date") {
      const options = {};
      if (format.includes("time")) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.timeZone = "Europe/Moscow";
        options.timeZoneName = "short";
      }
      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    },
  },
  mounted() {
    this.updateTime();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped></style>
