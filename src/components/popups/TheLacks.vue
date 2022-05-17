<template>
<div class="lacks stylish-wrapper">
  <p>Максимальная сумма получения</p>
  <span>0.00057 Bitcoin</span>
  <the-button tag="button">Не Хватает</the-button>
</div>
</template>

<script>
import TheButton from "../buttons/TheButton.vue";
export default {
  name: "TheLacks",
  components: {
    TheButton
  }
};
</script>

<style lang="scss">
.lacks{
  position: absolute;
}
</style>