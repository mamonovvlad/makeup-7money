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
@import "../../source/scss/utils/mixin.scss";

.heading,
.title,
.subtitle {
  transition: var(--transition);
  color: var(--quaternary);
  font-weight: bold;
}

.heading {
  font-size: 72px;
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
