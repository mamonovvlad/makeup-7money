<template>
  <div class="scoreboard bg-background-descr">
    <button
      class="scoreboard_arrow shadow_btn_white bg-background-descr"
      @click="trashClick"
    >
      <i class="icon-arrow-1 text-copy-descr"></i>
    </button>
    <div class="scoreboard_box">
      <button class="bg-background-descr">
        <i class="icon-datainput text-copy-main"></i>
        <p class="text-copy-main">{{ $t('dataInput') }}</p>
      </button>
      <button class="bg-background-descr">
        <i class="icon-payment text-copy-main"></i>
        <p class="text-copy-main">{{ $t('payment') }}</p>
      </button>
      <button class="bg-background-descr">
        <i class="icon-completion text-copy-main"></i>
        <p class="text-copy-main">{{ $t('completion') }}</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trashBtn: {
      trashBtn: Boolean,
    },
  },
};
</script>
