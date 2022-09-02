<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="block">
          <the-logo></the-logo>
          <the-toggle-theme></the-toggle-theme>
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
          <the-buttons @authorization="openAuthorization"></the-buttons>
        </div>
      </div>
    </div>
    <the-authorization @open="openPasswordRecovery"></the-authorization>
    <the-password-recovery
      @close="hidePasswordRecovery"
      v-if="isPasswordRecovery"
    ></the-password-recovery>
  </header>
</template>

<script>
//Buttons
import TheButton from "../buttons/TheButton.vue";
import TheButtons from "../buttons/TheButtons.vue";
import TheToggleTheme from "../buttons/TheToggleTheme.vue";
//Blocks
import TheLogo from "../blocks/TheLogo.vue";
//Popups
import TheAuthorization from "../popups/TheAuthorization.vue";
import ThePasswordRecovery from "../popups/ThePasswordRecovery.vue";

export default {
  name: "TheHeader",
  data() {
    return {
      isPasswordRecovery: false,
      isAuthorization: {
        index: -1,
        isOpen: false,
      },
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
    TheToggleTheme,
    TheAuthorization,
    ThePasswordRecovery,
  },
  mounted() {
    this.activeAccount();
  },
  provide() {
    return {
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

    & > .toggle__theme {
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
      top: -40px;
    }

    & span {
      color: var(--quaternary);
    }
  }
}
</style>
