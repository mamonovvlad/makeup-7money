<template>
  <section class="links stylish-wrapper" v-if="showHideBlock">
    <div class="items" :class="{ active: showLinks }">
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
      <a href="">Visa/MasterCard UAH => Bitcoin</a>
      <a href="">QIWI RUB => Bitcoin</a>
      <a href="">Яндекс Деньги RUB => Advanced Cash USD</a>
    </div>
    <button @click="showLinks = !showLinks">
      <strong>
        <span v-if="!showLinks"> {{ $t("showLinks") }}</span>
        <span v-else> {{ $t("hideLinks") }}</span>
      </strong>
    </button>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheLinks",
  data() {
    return {
      showLinks: false,
    };
  },
  computed: {
    ...mapGetters(["blockHide"]),
    showHideBlock() {
      return this.blockHide;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.links {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 20px 10px;

  & .items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    transition: var(--transition);
    overflow: hidden;
    max-height: 60px;
    gap: 8px;
    @include _768 {
      grid-template-columns: repeat(3, 1fr);
    }
    @include _576 {
      grid-template-columns: repeat(1, 1fr);
    }

    & a {
      color: var(--primary);
      word-break: break-all;
      text-decoration: none;
      @include crop-height(1);
    }
  }

  & button {
    max-width: max-content;
    align-self: center;
    margin-top: 5px;
    background-color: var(--transparent);
    transition: var(--transition);

    &:hover {
      color: var(--primary);
    }
  }

  & .active {
    max-height: 1400px;
  }
}
</style>
