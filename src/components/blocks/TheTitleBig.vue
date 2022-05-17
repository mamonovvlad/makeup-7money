<template>
  <div class="title--big">
    <div class="container">
      <h1>
        <slot name="title"></slot>
      </h1>
      <p v-if="this.$slots.description">
        <slot name="description"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheTitleBig",
};

</script>

<style lang="scss">
@import "../../source/scss/utils/mixin.scss";

.title--big {
  padding: 30px 0;
  text-align: center;
  color: var(--quaternary);
  background-color: var(--secondary);
  @include _768 {
    padding: 20px 0;
  }

  & h1 {
    font-weight: bold;
    font-size: 64px;
    @include _1200 {
      font-size: 32px;
    }
    @include _768 {
      font-size: 24px;
    }
  }

  & p {
    color: var(--ternary);
    font-size: 18px;
    margin-top: 20px;
    @include _768 {
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>