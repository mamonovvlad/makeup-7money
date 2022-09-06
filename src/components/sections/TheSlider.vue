<template>
  <section class="slider" id="slider" v-if="showHideBlock">
    <div class="wrapper" :class="{active: isActive === 0}">
      <the-title class="title" tag="button" @click="toggleBlock(0)">
        отзывы
      </the-title>
      <slot name="reviews"></slot>
    </div>
    <div class="wrapper" :class="{active: isActive === 1}">
      <the-title class="title" tag="button" @click="toggleBlock(1)">
        новости
      </the-title>
      <slot name="news"></slot>
    </div>
    <div class="wrapper" :class="{active: isActive === 2}">
      <the-title class="title" tag="button" @click="toggleBlock(2)">
        блог
      </the-title>
      <slot name="blog"></slot>
    </div>
  </section>
</template>

<script>
import TheTitle from "../blocks/TheTitle.vue";
import TheButton from "../buttons/TheButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "Slider",
  components: { TheTitle, TheButton },
  data() {
    return {
      isActive: 0,
    };
  },
  computed: {
    ...mapGetters(["blockHide"]),
    showHideBlock() {
      if (window.innerWidth > 992) {
        return this.blockHide;
      }
    },
  },
  methods: {
    toggleBlock(idx) {
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
      content: "";
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
