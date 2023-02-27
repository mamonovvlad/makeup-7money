<template>
  <section class="recent-exchanges" v-if="showHideBlock">
    <the-title class="title" tag="h2">Последние обмены</the-title>
    <div class="wrapper">
      <div class="data-exchange stylish-wrapper">
        <div class="item">
          <div class="info">
            <div class="name">
              <span class="currency-icon BTC"></span>
              <strong>Bitcoin</strong>
            </div>
            <div class="price">
              <span>BTC:</span>
              <strong>0.50</strong>
            </div>
          </div>
          <icon-success></icon-success>
          <div class="info">
            <div class="name">
              <span class="currency-icon BTC"></span>
              <strong>Bitcoin</strong>
            </div>
            <div class="price">
              <span>BTC:</span>
              <strong>0.50</strong>
            </div>
          </div>
        </div>
        <p>Меньше минуты</p>
      </div>
      <div class="data-exchange stylish-wrapper">
        <div class="item">
          <div class="info">
            <div class="name">
              <span class="currency-icon BTC"></span>
              <strong>Bitcoin</strong>
            </div>
            <div class="price">
              <span>BTC:</span>
              <strong>0.50</strong>
            </div>
          </div>
          <icon-success></icon-success>
          <div class="info">
            <div class="name">
              <span class="currency-icon BTC"></span>
              <strong>Bitcoin</strong>
            </div>
            <div class="price">
              <span>BTC:</span>
              <strong>0.50</strong>
            </div>
          </div>
        </div>
        <p>Меньше минуты</p>
      </div>
      <div class="data-exchange stylish-wrapper">
        <div class="item">
          <div class="info">
            <div class="name">
              <span class="currency-icon BTC"></span>
              <strong>Bitcoin</strong>
            </div>
            <div class="price">
              <span>BTC:</span>
              <strong>0.50</strong>
            </div>
          </div>
          <icon-success></icon-success>
          <div class="info">
            <div class="name">
              <span class="currency-icon BTC"></span>
              <strong>Bitcoin</strong>
            </div>
            <div class="price">
              <span>BTC:</span>
              <strong>0.50</strong>
            </div>
          </div>
        </div>
        <p>Меньше минуты</p>
      </div>
    </div>
  </section>
</template>

<script>
import TheTitle from "../blocks/TheTitle.vue";
import IconSuccess from "../icons/IconSuccess.vue";
import { mapGetters } from "vuex";
export default {
  name: "TheRecentExchanges",
  components: {
    TheTitle,
    IconSuccess,
  },
  computed: {
    ...mapGetters(["blockHide"]),
    showHideBlock() {
      if (window.innerWidth > 992) {
        return this.blockHide;
      }
    },
  },
};
</script>

<style lang="scss">
.recent-exchanges {
  & .title {
    margin-bottom: 10px;
  }

  & .wrapper {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.data-exchange {
  padding: 20px;

  & .item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    & svg {
      width: 40px;
      color: var(--primary);
    }
  }

  & .info {
    display: flex;
    flex-direction: column;
  }

  & .name {
    display: flex;
    column-gap: 6px;
    margin-bottom: 6px;
    font-size: 16px;
  }

  & .name,
  & .price strong {
    color: var(--quaternary);
  }

  & .price {
    font-size: 14px;
    & span {
      margin-right: 6px;
    }
  }
}
</style>
