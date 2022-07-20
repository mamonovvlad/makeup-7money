<template>
  <div class="contest-advantages__counter">
    <transition name="fade">
      <div v-if="loaded" class="contest-advantages__items text-copy-descr">
        <div class="contest-advantages__item">
          <span class="counter-title">{{ days }}:</span>
          <span class="counter-description">Дней</span>
        </div>
        <div class="contest-advantages__item">
          <span class="counter-title">{{ hours }}:</span>
          <span class="counter-description">Часов</span>
        </div>
        <div class="contest-advantages__item">
          <span class="counter-title">{{ minutes }}:</span>
          <span class="counter-description">Минут</span>
        </div>
        <div class="contest-advantages__item">
          <span class="counter-title">{{ seconds }}</span>
          <span class="counter-description">Секунд</span>
        </div>
      </div>
    </transition>
    <span v-if="!expired"
          class="description text-copy-descr bg-background-descr">Осталось до окончания конкурса</span>
    <span v-else class="description text-copy-descr bg-background-descr">Конкурса еще не начался</span>
  </div>

</template>

<script>
export default {
  props: ["year", "month", "date", "hour", "minute", "second"],
  name: "TheCounter",
  data() {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      loaded: false,
      expired: false,
    };
  },
  computed: {
    end() {
      return new Date(
        this.year,
        this.month - 1,
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
        const start = new Date().getTime();
        const end = this.end.getTime();
        const distance = end - start;
        if (distance < 0) {
          clearInterval(timer);
          this.expired = true;
          this.loaded = true;
          return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / (1000));

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