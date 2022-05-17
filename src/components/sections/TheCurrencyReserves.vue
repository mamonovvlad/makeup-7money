<template>
  <section class="currency-reserves" id="currency-reserves">
    <the-title class="title" tag="h2">Резервы валют</the-title>
    <div class="wrapper stylish-wrapper">
      <div class="block" v-for="block in 3" :key="block">
        <div v-for="item in 5" class="item">
          <div class="name">
            <span class="BTC"></span>
            <p>Bitcoin</p>
          </div>
          <div class="price">
            <p>210</p>
            <span>BTC</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TheTitle from "../blocks/TheTitle.vue";

export default {
  name: "TheCurrencyReserves",
  components: { TheTitle },
};
</script>

<style lang="scss">
.currency-reserves {

  & .title {
    margin-bottom: 20px;
  }

  & .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 12px 10px;
  }

  & .block {
    padding: 0 20px;
    border-right: 2px solid var(--secondary);
    transition: var(--transition);

    &:last-child {
      margin-right: 0;
      border-right: 0;
    }
  }

  & .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
  }

  & .name,
  & .price {
    display: flex;
    align-items: center;
  }

  & .name {
    & span {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      margin-bottom: 2px;
    }
  }

  & .price {
    & p {
      margin-right: 5px;
      color: var(--quaternary);
      font-weight: 600;
    }

    & span {
      font-size: 12px;
    }
  }
}
</style>
