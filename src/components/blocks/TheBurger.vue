<template>
  <div class="burger">
    <div class="burger__wrapper">
      <div class="buttons">
        <the-toggle-theme></the-toggle-theme>
        <the-burger-close @click="$emit('hideBurger')"></the-burger-close>
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
import TheToggleTheme from "../buttons/TheToggleTheme.vue";
//Buttons
import TheBurgerClose from "../buttons/TheBurgerClose.vue";

export default {
  name: "TheBurger",
  components: {
    TheSocialNetwork,
    TheBurgerClose,
    TheToggleTheme,
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.burger {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  background: var(--secondary-transparent);
  transition: var(--transition);
  width: 100%;
  z-index: 4;


  &__wrapper {
    display: flex;
    flex-direction: column;
    background: var(--secondary);
    box-shadow: var(--shadow);
    height: 100%;
    max-width: 500px;
    width: 100%;
    padding: 30px 20px;
    row-gap: 40px;
    overflow: auto;
    @include _768 {
      padding: 25px 10px;
      max-width: 320px;
    }
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
      border-radius: 8px;
      overflow: hidden;

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