<template>
  <div class="leave-feedback" :class="{'first-option':secondOption === false}" v-if="isShow">
    <div v-if="!secondOption" class="stylish-wrapper">
      <button class="close" @click="isHideBlock">
        <icon-close></icon-close>
      </button>
      <icon-thanks></icon-thanks>
      <p>
        <strong class="text--black-white">Благодарим</strong> за
        использование нашего сервиса! Уважаемый клиент, если Вам
        понравилось обслуживание нашего сервиса, Вы можете
        <strong class="text--black-white">оставить отзыв здесь:</strong>
      </p>

      <the-button tag="a" target="_blank" href="//www.bestchange.ru/7money-exchanger.html">
        <template #name>
          Оставить отзыв
        </template>
      </the-button>
      <p>
        Либо на нашем
        <a href="/reviews"><strong class="text--green">сайте</strong></a>
      </p>

    </div>
    <div v-else class="wrapper">
      <div class="info">
        <p>
          <strong class="text--black-white">Благодарим</strong> за
          использование нашего сервиса! Уважаемый клиент, если Вам
          понравилось обслуживание нашего сервиса, Вы можете
          <strong class="text--black-white">оставить отзыв здесь:</strong>
        </p>
        <icon-thanks></icon-thanks>
      </div>
      <div class="buttons">
        <the-button tag="a" href="//www.bestchange.ru/7money-exchanger.html" target="_blank">
          <template #name>
            Оставить отзыв на BESTCHANGE
          </template>
        </the-button>
        <the-button class="button--transparent" tag="a" href="/reviews" target="_blank">
          <template #name>
            Либо на нашем сайте
          </template>
        </the-button>
      </div>
    </div>
  </div>
</template>

<script>
import TheButton from "../buttons/TheButton.vue";
import IconThanks from "../icons/IconThanks.vue";
import IconClose from "../icons/IconClose.vue";

export default {
  name: "TheLeaveFeedback",
  props: {
    secondOption: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  components: {
    TheButton,
    IconThanks,
    IconClose,
  },
  methods: {
    getCookie(name) {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)",
        ),
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    setCookie(name, value, options) {
      options = options || {};

      let expires = options.expires;

      if (typeof expires == "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
      }
      if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
      }

      value = encodeURIComponent(value);

      let updatedCookie = name + "=" + value;

      for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
          updatedCookie += "=" + propValue;
        }
      }

      document.cookie = updatedCookie;
    },
    deleteCookie(name) {
      this.setCookie(name, "", {
        expires: -1,
        path: "/",
      });
    },
    isHideBlock() {
      this.isShow = false;
      this.setCookie("first-option", 1);
    },
    isShowBlock() {
      if (window.innerWidth <= 992) {
        this.isShow = this.getCookie("first-option") === undefined;
      }
    },

  },
  mounted() {
    this.isShowBlock();
  },
};
</script>

<style lang="scss">
@import "../../source/scss/utils/mixin";

.leave-feedback {
  & .stylish-wrapper {
    padding: 20px;
    width: 350px;
    border-radius: var(--radius-ten);
    @include _992 {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--seventh);
      z-index: 2;
    }
    @include _768 {
      max-width: 300px;
    }

    & .button {
      margin-top: 20px;
      margin-bottom: 10px;
      width: 100%;
    }
  }

  & .close {
    display: none;
    @include _992 {
      position: absolute;
      right: 10px;
      top: 10px;
      display: block;
      width: 16px;
    }
  }

  & svg {
    width: 100%;
  }

  & a {
    text-decoration: none;

  }

  & .wrapper {
    padding: 20px;
    border-radius: var(--radius-ten);
    box-shadow: var(--shadow-inset);

    & svg {
      height: 75px;
    }

    & .info {
      display: flex;
      column-gap: 20px;
      margin-bottom: 10px;
      @include _768 {
        flex-direction: column;
      }

      & p {
        @include _768 {
          margin-bottom: 10px;
        }
      }
    }

  }
}
</style>