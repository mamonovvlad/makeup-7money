<template>
  <div class="time-processing">
    <figure>
      <icon-time-processing></icon-time-processing>
    </figure>
    <p>
      {{ $t("timeProcessing") }}
      Внимание: Одновременно не может существовать более одной заявки, все
      прошлые заявки будут перезагружены в последнюю созданную.
    </p>
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
