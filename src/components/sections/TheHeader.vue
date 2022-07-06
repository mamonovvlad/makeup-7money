<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="block">
          <the-logo :theme="theme"></the-logo>
          <the-toggle-theme @callback="callBackIndex"></the-toggle-theme>
          <div class="time">
            <p>
              {{ $t("schedule") }}
              <span>{{ $t("workingHours") }}</span>
            </p>
            <p>
              {{ $t("time") }}
              <span>{{ dateFilter(new Date(), "time") }}</span>
            </p>
          </div>
        </div>
        <div class="block">
          <the-button tag="a" :href="$t('checkStatus')">
            <template #name>{{ $t("checkOpSt") }}</template>
          </the-button>
          <the-buttons
            v-for="(button,idx) in buttons"
            :key="idx"
            :className="button.className"
            :animate="button.animate">
            <template #icon>
              <component :is="button.icon"></component>
            </template>
            <template #block>
              <component @open="openAuthorization" :is="button.block"></component>
            </template>
          </the-buttons>
        </div>
      </div>
    </div>
    <the-authorization @open="openPasswordRecovery"></the-authorization>
    <the-password-recovery @close="hidePasswordRecovery" v-if="isPasswordRecovery"></the-password-recovery>
  </header>
</template>

<script>
//Images
import IconAccount from "../icons/IconAccount.vue";
import IconShare from "../icons/IconShare.vue";
import IconBurger from "../icons/IconBurger.vue";
//Buttons
import TheButton from "../buttons/TheButton.vue";
import TheButtons from "../buttons/TheButtons.vue";
import TheToggleTheme from "../buttons/TheToggleTheme.vue";
//Blocks
import TheLogo from "../blocks/TheLogo.vue";
import TheLanguages from "../blocks/TheLanguages.vue";
import TheAuthorizationButtons from "../blocks/TheAuthorizationButtons.vue";
import TheSocialNetwork from "../blocks/TheSocialNetwork.vue";
import TheBurger from "../blocks/TheBurger.vue";
//Popups
import TheAuthorization from "../popups/TheAuthorization.vue";
import ThePasswordRecovery from "../popups/ThePasswordRecovery.vue";


export default {
  name: "TheHeader",
  data() {
    return {
      isPasswordRecovery: false,
      number: -1,
      isAuthorization: {
        index: -1,
        isOpen: false,
      },
      isAccordion: {
        count: 0,
        active: null,
      },
      theme: "light",
      interval: null,
      buttons: [
        {
          icon: "the-languages",
          className: "button__languages",
        },
        {
          icon: "icon-account",
          block: "the-authorization-buttons",
          animate: "authorization-buttons",
          className: "button__account",
        },
        {
          icon: "icon-share",
          block: "the-social-network",
          className: "button__share",
        },
        {
          icon: "icon-burger",
          block: "the-burger",
          animate: "animation-from-right",
        },
      ],
    };
  },
  methods: {
    //Формат даты
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
    //Показать окно "Забыли пароль?"
    openPasswordRecovery() {
      this.isPasswordRecovery = true;
      this.isAuthorization.isOpen = false;
    },
    //Закрыть окно "Забыли пароль?"
    hidePasswordRecovery() {
      this.isPasswordRecovery = false;
    },
    //Отктыть окно "Вход || Реристрация"
    openAuthorization(idx) {
      this.isAuthorization.isOpen = true;
      this.isAuthorization.index = idx;
    },
    //Передача значения темы
    callBackIndex(index) {
      if (index === 0) {
        this.theme = "light";
      } else {
        this.theme = "dark";
      }
      this.$emit("call-back-theme", this.theme);
    },
    //Проверка авторизации
    activeAccount() {
      let login = document.getElementById("login");
      let buttonAccount = document.querySelector(".button__account");
      if (login.value === "1") {
        buttonAccount.classList.add("account--active");
      }
    },
  },
  components: {
    TheLogo,
    TheButton,
    TheButtons,
    TheBurger,
    TheToggleTheme,
    TheLanguages,
    TheAuthorizationButtons,
    TheSocialNetwork,
    TheAuthorization,
    ThePasswordRecovery,
    IconAccount,
    IconShare,
    IconBurger,
  },
  mounted() {
    this.activeAccount();
  },
  provide() {
    return {
      isAccordion: this.isAccordion,
      isAuthorization: this.isAuthorization,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.header {
  position: relative;
  padding: 30px 0;
  //background: var(--secondary);
  @include _576 {
    padding-top: 50px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .block {
    display: flex;
    align-items: center;
    column-gap: 20px;
    @include _1200 {
      column-gap: 15px;
    }
    @include _768 {
      column-gap: 10px;
    }

    & .button {
      @include _1200 {
        display: none;
      }
    }

    & .button__share {
      @include _576 {
        display: none;
      }
    }

    & .toggle__theme {
      @include _768 {
        display: none;
      }
    }
  }

  & .time {
    line-height: 140%;
    @include _1200 {
      font-size: 12px;
    }
    @include _576 {
      position: absolute;
      top: 5px;
    }

    & span {
      color: var(--quaternary);
    }
  }
}
</style>
