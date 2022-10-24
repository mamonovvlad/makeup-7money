<template>
  <main class="check-status">
    <the-title-big>
      <template #title>{{ $t("checkOperation") }}</template>
    </the-title-big>
    <div class="container">
      <div class="wrapper">
        <div class="stylish-wrapper">
          <the-title class="title" tag="h2">
            {{ $t("transaction") }}
          </the-title>
          <div class="field">
            <span class="form-group">
              <input
                id="operation"
                type="text"
                placeholder="AP12345678"
                name="code"
                v-model="value"
              />
            </span>
          </div>
          <the-button tag="button" @click.native="checkStatus">
            <template #name> {{ $t("check") }}</template>
          </the-button>
        </div>
        <icon-check-status></icon-check-status>
      </div>
    </div>
  </main>
</template>

<script>
import TheTitleBig from "../blocks/TheTitleBig.vue";
import TheTitle from "../blocks/TheTitle.vue";
import IconCheckStatus from "../icons/IconCheckStatus.vue";
import TheButton from "../buttons/TheButton.vue";

export default {
  name: "TheCheckStatus",
  data() {
    return {
      value: null,
    };
  },
  components: {
    TheTitle,
    TheTitleBig,
    IconCheckStatus,
    TheButton,
  },
  methods: {
    checkStatus() {
      if (this.value !== null) {
        document.location.href = "/order/status/" + this.value;
      }

    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.check-status {
  & .wrapper {
    position: relative;
    display: flex;
    padding: 60px 0;
    @include _768 {
      flex-direction: column;
      padding: 40px 0;
    }
  }

  & .stylish-wrapper {
    padding: 60px;
    background: var(--seventh);
    @include _1200 {
      padding: 40px;
    }
    @include _768 {
      padding: 20px;
    }
  }

  & .title {
    margin-bottom: 30px;
  }

  & .field {
    margin-bottom: 20px;
  }

  & .button {
    text-transform: capitalize;
    width: 100%;
  }

  & figure {
    width: 100%;
    position: absolute;
    top: -40px;
    right: 0;
    max-width: 666px;
    @include _1200 {
      top: -18px;
      right: -40px;
      max-width: 500px;
    }
    @include _992 {
      top: 25px;
      right: -60px;
      max-width: 440px;
      opacity: 0.8;
    }
    @include _768 {
      position: relative;
      top: auto;
      right: auto;
      max-width: 100%;
      opacity: 1;
    }
  }
}
</style>