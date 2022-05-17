<template>
  <div class="information stylish-wrapper ">
    <slot></slot>
  </div>
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

  & ol, ul {
    margin-left: 30px;
  }

  & h1, h2, h3 {
    font-weight: 600;
  }

  & h1, h2, h3, p, ol, ul {
    margin-bottom: 10px;
  }

  & a {
    color: var(--primary);
  }
}

</style>