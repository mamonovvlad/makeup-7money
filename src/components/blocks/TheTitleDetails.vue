<template>
  <div class="elements__wrapper">
    <the-title tag="h1" class="subtitle">
      {{ calculateData.course_h1 }}
    </the-title>
    <the-current-time></the-current-time>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheTitle from "./TheTitle.vue";
import TheCurrentTime from "./TheCurrentTime.vue";

export default {
  name: "TheTitleDetails",
  computed: {
    ...mapGetters(["calculateData"]),
  },
  components: {
    TheTitle,
    TheCurrentTime,
  },
};
</script>
