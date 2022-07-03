<template>
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer__wrapper">
        <div class="footer__block">
          <p>{{ $t("footerText") }}</p>
        </div>
        <div class="footer__block">
          <a href="mailto:hello@7money.co">hello@7money.co</a>
          <a :href="$t('footerLink')" target="_blank">BESTCHANGE</a>
          <a href="https://kurs.expert/ru/obmennik/7money.co/feedbacks.html#reputation"
             target="_blank">
            {{ $t("nameKursExpert") }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>


<style lang="scss">
@import "../../assets/scss/utils/mixin";

.footer {
  background-color: var(--secondary);
  margin-top: 40px;
  padding: 40px 0;
  position: relative;
  @include _768 {
    padding: 20px 0
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    @include _768 {
      flex-direction: column
    }
    @include _576 {
      gap: 10px;
    }
  }

  &__block {
    display: flex;
    gap: 20px;
    @include _768 {
      justify-content: space-between;
      width: 100%;
      flex-wrap: wrap;
      gap: 10px
    }

    & a {
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        color: var(--primary)
      }
    }

  }
}
</style>