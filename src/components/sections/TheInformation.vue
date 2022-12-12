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
    font-weight: 600;
  }
  & li {
    margin: 6px 0;
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
