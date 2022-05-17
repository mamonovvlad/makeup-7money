<template>
  <div class="burger">
    <div class="burger__wrapper">
      <div class="buttons">
        <the-toggle-theme></the-toggle-theme>
        <the-burger-close></the-burger-close>
      </div>

      <nav>
        <a :href="$t('menuNews')">{{ $t("news") }}</a>
        <a :href="$t('menuFaq')">FAQ</a>
        <a :href="$t('menuPosts')">{{ $t("posts") }}</a>
        <a :href="$t('menuReviews')">{{ $t("reviews") }}</a>
        <a :href="$t('menuAffiliateProgram')">{{ $t("affiliateProgram") }}</a>
        <a :href="$t('menuStatus')">{{ $t("checkOpSt") }}</a>
        <a :href="$t('menuAgreement')">{{ $t("agreement") }}</a>
        <a :href="$t('menuRules')">{{ $t("rules") }}</a>
        <a :href="$t('menuSecurity')">{{ $t("security") }}</a>
        <a :href="$t('menuPartners')">{{ $t("partners") }}</a>
        <a :href="$t('aboutLink')">{{ $t("about") }}</a>
      </nav>
      <the-social-network></the-social-network>
    </div>
  </div>
</template>

<script>
import TheSocialNetwork from "./TheSocialNetwork.vue";
import TheBurgerClose from "../buttons/TheBurgerClose.vue";
import TheToggleTheme from "./TheToggleTheme.vue";

export default {
  // props: {
  //   close: {
  //     type: Function,
  //     default: () => {
  //     },
  //   },
  // },
  name: "TheBurger",
  components: {
    TheSocialNetwork,
    TheBurgerClose,
    TheToggleTheme,
  },
};
</script>

<style lang="scss">
@import "../../source/scss/utils/mixin";

.burger {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: var(--secondary);
  max-width: 500px;
  width: 100%;
  padding: 30px 20px;
  overflow: auto;
  z-index: 4;
  @include _768 {
    padding: 25px 10px;
    max-width: 320px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    row-gap: 40px;
  }

  & nav {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    & a {
      font-size: 20px;
      padding: 14px 20px;
      text-decoration: none;
      width: max-content;
      transition: var(--transition);
      @include _768 {
        font-size: 16px;
        padding: 10px 15px;
      }

      &:hover {
        box-shadow: var(--shadow);
        color: var(--primary);
      }
    }
  }

  & .buttons {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    @include _768 {
      margin: 0 10px;
    }

    & .toggle__theme {
      display: none;
      @include _576 {
        display: block;
      }
    }
  }

  & .social-network {
    display: flex;
    padding: 0 20px;
    column-gap: 20px;

    & a {
      width: 30px;
      height: 30px;
      filter: grayscale(100%);
      transition: var(--transition);

      &:hover {
        filter: grayscale(0);
      }
    }

    & img {
      width: 100%;
    }
  }

}
</style>