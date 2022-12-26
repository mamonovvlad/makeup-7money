<template>
  <div class="contest-advantages__counter">
    <transition name="fade">
      <div v-if="loaded" class="contest-advantages__items">
        <div class="contest-advantages__item">
          <span class="counter-title">{{ days }}:</span>
          <span class="counter-description">{{ $t("days") }}</span>
        </div>
        <div class="contest-advantages__item">
          <span class="counter-title">{{ hours }}:</span>
          <span class="counter-description">{{ $t("days") }}</span>
        </div>
        <div class="contest-advantages__item">
          <span class="counter-title">{{ minutes }}:</span>
          <span class="counter-description">{{ $t("minutes") }}</span>
        </div>
        <div class="contest-advantages__item">
          <span class="counter-title">{{ seconds }}</span>
          <span class="counter-description">{{ $t("seconds") }}</span>
        </div>
      </div>
    </transition>
    <span v-if="!expired" class="description">
      {{ $t("endContest") }}
    </span>
    <span v-else class="description">{{ $t("startContest") }}</span>
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
        this.second
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
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
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

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.contest-advantages {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  @include _768 {
    align-items: center;
    flex-direction: column;
  }

  &__items {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__item {
    display: flex;
    flex-direction: column;

    & .counter-description {
      font-weight: 500;
      color: var(--quaternary);
    }
  }

  &__counter {
    width: 50%;
    text-align: center;
    @include _768 {
      width: 100%;
    }
  }

  & .description {
    margin-top: 10px;
    padding: 12px 20px;
    border-radius: 10px;
    font-weight: 500;
    color: var(--quaternary);
    background: var(--secondary);
    display: block;
    @include _768 {
      padding: 8px 14px;
    }
  }
}

.counter-title {
  display: inline-flex;
  font-size: 60px;
  line-height: 60px;
  font-weight: 500;
  color: var(--quaternary);
  @include _992 {
    font-size: 50px;
  }
  @include _768 {
    font-size: 40px;
  }
}
</style>
