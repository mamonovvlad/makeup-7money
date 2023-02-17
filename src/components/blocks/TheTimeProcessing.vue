<template>
  <div class="time-processing">
    <figure>
      <icon-time-processing></icon-time-processing>
    </figure>
    <div>
      <p>{{ $t("timeProcessing") }}</p>
      <p>{{ $t("attention") }}</p>
    </div>
  </div>
</template>

<script>
import IconTimeProcessing from "../icons/IconTimeProcessing.vue";

export default {
  name: "TheTimeProcessing",
  components: {
    IconTimeProcessing,
  },
};
</script>

<style lang="scss">
.time-processing {
  padding: 15px;
  box-shadow: var(--shadow);
  border-radius: var(--radius-eigh);
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
