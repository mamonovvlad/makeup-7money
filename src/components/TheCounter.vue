<template>
  <div v-if="loaded" class="contest-advantages__item contest-advantages__counter">
    <h2 class="text-copy-descr">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</h2>
    <span v-if="!expired" class="text-copy-descr bg-background-descr">Осталось до окончания конкурса</span>
    <span v-else class="text-copy-descr bg-background-descr">Конкурса еще не начался</span>
  </div>
</template>

<script>
export default {
  props: ["year", "month", "date", "hour", "minute", "second"],
  name: "TheCounter",
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      loaded: false,
      expired: false,
    };
  },
  computed: {
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
    end() {
      return new Date(
        this.year,
        this.month,
        this.date,
        this.hour,
        this.minute,
        this.second,
      );
    },
  },
  methods: {
    formatNum(num) {
      return num < 10 ? "0" + num : num;
    },
    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date();
        const distance = this.end.getTime() - now.getTime();

        if (distance < 0) {
          clearInterval(timer);
          this.expired = true;
          this.loaded = true;
          return;
        }

        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);

        this.seconds = this.formatNum(seconds);
        this.minutes = this.formatNum(minutes);
        this.hours = this.formatNum(hours);
        this.days = this.formatNum(days);
        this.loaded = true;

      }, 1000);
    },
  },
  mounted() {
    this.showRemaining();
  },
};
</script>