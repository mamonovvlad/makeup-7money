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
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
  color: var(--quaternary);

  & ol,
  ul {
    margin-left: 30px;
    list-style: disc;
  }

  & h1,
  h2,
  h3 {
    font-weight: 600;
  }

  & strong {
    font-weight: 500;
  }

  & a {
    color: var(--primary);
  }
}
</style>
