<template>
  <section class="links stylish-wrapper">
    <div class="items" :class="{active: showLinks}">
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
    <button
      @click="showLinks = !showLinks">
      <span v-if="!showLinks"> {{ $t("showLinks") }}</span>
      <span v-else> {{ $t("hideLinks") }}</span>
    </button>
  </section>
</template>

<script>
export default {
  name: "TheLinks",
  data() {
    return {
      showLinks: false,
    };
  },
};
</script>

<style lang="scss">
.links {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 20px 10px;

  & .items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    transition: var(--transition);
    overflow: hidden;
    max-height: 60px;
    gap: 5px;

    & a {
      color: var(--primary);
      text-decoration: none;
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
    max-height: 400px;
  }
}

</style>