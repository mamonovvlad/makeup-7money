<template>
  <section class="slider" id="slider">
    <div class="wrapper" v-for="(slider, idx) in infoSlider" :key="idx" :class="{active: isActive === idx}">
      <the-title class="title" @click.native="isShowReviews(idx)" tag="button">{{ slider.title }}</the-title>
      <div class="items">
        <a href="/1" class="item" v-for="(info,idx) in slider.information.slice(0, 4)" :key="idx">
          <div class="box">
            <h3>{{ info.name }}</h3>
            <span class="date">{{ info.date }}</span>
          </div>
          <p>{{ info.text }}</p>
        </a>
      </div>
      <the-button tag="button">
        <template #name>
          Читать {{ slider.title }}
        </template>
      </the-button>
    </div>
  </section>
</template>

<script>
import TheTitle from "../blocks/TheTitle.vue";
import TheButton from "../buttons/TheButton.vue";

const infoSlider = [
  {
    title: "отзывы",
    information: [
      {
        name: "Гарик",
        date: "2 дня назад",
        text: "Благодарен сервису за успешно и быстро проведенный обмен.",
      },
      {
        name: "Гарик",
        date: "27 окт. 2021 г.",
        text: "Благодарен сервису за успешно и быстро проведенный",
      },
      {
        name: "Гарик",
        date: "27 окт. 2021 г.",
        text: "Благодарен сервису за успешно",
      },
      {
        name: "Гарик",
        date: "27 окт. 2021 г.",
        text: "Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую.Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный обмен.",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую.Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую",
      },
    ],
  },
  {
    title: "новости",
    information: [
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный обмен.",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую.Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую",
      },
    ],
  },
  {
    title: "блог",
    information: [
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный обмен.",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую.Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный обмен.",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно",
      },
      {
        name: "Гарик",
        text: "Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую.Благодарен сервису за успешно и быстро проведенный обмен. Однозначно рекомендую",
      },
    ],
  },
];
export default {
  name: "Slider",
  components: { TheTitle, TheButton },
  data() {
    return {
      infoSlider,
      isActive: 0,
    };
  },
  methods: {
    isShowReviews(idx) {
      console.log("1");
      this.isActive = idx;
    },

  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.slider {
  display: flex;
  gap: 20px;

  & .button {
    margin-top: 20px;
    width: 0;
    opacity: 0;
    position: absolute;
    z-index: -100;
  }

  & .wrapper {
    position: relative;
    min-width: 190px;
    flex: 1;

    & .title {
      text-transform: capitalize;
      cursor: pointer;
      color: var(--ternary);
      margin-bottom: 20px;
      background: var(--transparent);

      &:hover {
        color: var(--quaternary);
      }
    }
  }

  & .items {
    border-radius: var(--radius-eigh);
    background: var(--secondary);
  }

  & .item {
    padding: 10px 20px;
    display: block;
    text-decoration: none;
    position: relative;

    &:after {
      content: '';
      bottom: 0;
      height: 1px;
      background: var(--fifth);
      position: absolute;
      left: 20px;
      right: 20px;
    }

    &:first-child {
      padding: 20px 20px 10px;
    }

    &:last-child {
      padding: 10px 20px 20px;

      &:after {
        display: none;
      }
    }

    & .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    & h3 {
      font-weight: 500;
      font-size: 12px;
      @include crop-height(2);
      color: var(--quaternary);

      &:hover {
        color: var(--primary);
      }
    }

    & .date,
    & p {
      font-size: 18px;
    }

    & .date {
      font-size: 18px;
      display: none;
    }

    & p {
      display: none;
    }
  }

  & .active {
    flex: 8;

    & .button {
      width: 100%;
      opacity: 1;
      position: relative;
      z-index: 1;
      transition: width 0.4s, opacity 0.4s ease-in-out;
    }

    & .title {
      color: var(--quaternary);
    }

    & .items {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: 20px;
      background: var(--transparent);
    }

    & .item {
      box-shadow: var(--shadow);
      border-radius: var(--radius-ten);
      padding: 20px;

      &:after {
        display: none;
      }

      & .box {
        margin-bottom: 15px;
      }

      & h3 {
        font-size: 24px;
        font-weight: 600;
      }

      & .date {
        display: block;
      }

      & p {
        display: block;
        font-size: 18px;
        @include crop-height(4);
      }
    }
  }
}
</style>
