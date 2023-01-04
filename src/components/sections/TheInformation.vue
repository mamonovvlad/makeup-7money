<template>
  <section class="information stylish-wrapper">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "TheInformation",
};
</script>

<style lang="scss">
.information {
  line-height: 19.6px;
  padding: 20px;
  color: var(--quaternary);

  & ol,
  ul {
    margin: 12px 0 12px 30px;
    list-style: disc;
  }

  & h1,
  h2,
  h3 {
    font-weight: 500;
  }
  & li {
    margin: 4px 0;
  }
  & h1,
  h2,
  h3,
  p,
  ol,
  ul {
    margin-bottom: 12px;
  }

  & strong {
    font-weight: 500;
  }

  & a {
    color: var(--primary);
  }
}
</style>
