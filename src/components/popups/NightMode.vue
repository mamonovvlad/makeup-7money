<template>
  <div class="night_mode">
    <div class="night_mode_box shadow_btn_white bg-background-main">
      <div class="close close_modal_night" onclick="document.querySelector('.night_mode').style.display='none'">
        <i class="icon-cancel"></i>
      </div>
      <div class="night_mode_info">
        <div class="night_mode_img">
          <img
            class="lazyload"
            data-src="/source/images/NightMode/nightmode.svg"
            alt
          />
        </div>
        <div class="night_mode_text">
          <p class="night_mode_title text-copy-descr">
            {{ $t("nightModeTextOne") }}
          </p>
          <p class="night_mode_descr">{{ $t("nightModeTextTwo") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NignMode",
};
</script>

<style scoped>

</style>