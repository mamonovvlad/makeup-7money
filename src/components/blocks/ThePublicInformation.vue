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
  padding: 5px;

  & p,
  & a {
    color: var(--white);
  }

  & a {
    font-weight: 600;
  }
}
</style>
