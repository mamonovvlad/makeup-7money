<template>
  <component :is="getTag">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "MainTitle",
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  computed: {
    getTag() {
      return this.tag;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.heading,
.title,
.subtitle {
  color: var(--quaternary);
  font-weight: 500;
}

.heading {
  font-size: 60px;
  @include _768 {
    font-size: 24px;
  }
}

.title {
  font-size: 36px;
  @include _768 {
    font-size: 18px;
  }
}

.subtitle {
  font-size: 24px;
  @include _768 {
    font-size: 18px;
  }
}
</style>
