<template>
  <div class="public-information">
    <p>
      <slot></slot>
    </p>
  </div>
</template>
<style lang="scss">
.public-information {
  background: var(--light-green);
  text-align: center;
  font-weight: var(--font-family);
  & p,
  & a {
    color: var(--white);
  }
  & a {
    font-weight: 600;
  }
}
</style>
