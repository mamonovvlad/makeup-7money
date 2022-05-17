<template>
  <footer class="footer bg-background-descr" id="footer">
    <div class="container">
      <div class="footer_box">
        <div class="footer_block text-copy-main">
          <p>{{$t('footerText')}}</p>
        </div>
        <div class="footer_block">
          <a class="mail text-copy-main" href="mailto:hello@7money.co">hello@7money.co</a>
          <a
            class="link text-copy-main"
            :href="$t('footerLink')"
            target="_blank"
          >BESTCHANGE</a>
          <a
            class="link text-copy-main"
            href="https://kurs.expert/ru/obmennik/7money.co/feedbacks.html#reputation"
            target="_blank"
          > {{$t('nameKursExpert')}}</a>
        </div>
      </div>
    </div>
  </footer>
</template>