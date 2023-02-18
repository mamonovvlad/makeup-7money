<template>
  <div class="toggle__theme">
    <button
      v-for="(button, idx) in buttons"
      :key="button.id"
      :class="{ active: index === idx }"
      @click="toggle(idx, $event)"
    >
      <component :is="button.icon"></component>
    </button>
  </div>
</template>

<script>
import IconSun from "../icons/IconSun.vue";
import IconMoon from "../icons/IconMoon.vue";
import { mapMutations } from "vuex";

const buttons = [
  {
    icon: "IconSun",
  },
  {
    icon: "IconMoon",
  },
];

export default {
  data() {
    return {
      buttons,
      index: "0",
    };
  },
  components: {
    IconSun,
    IconMoon,
  },
  methods: {
    ...mapMutations(["setDefinitionTheme"]),
    async toggle(idx, e) {
      if (this.index !== idx) {
        this.index = idx;
        localStorage.setItem("theme", this.index);
        this.definitionTheme();
      }
    },

    definitionTheme() {
      if (localStorage.getItem("theme") === "0") {
        this.index = "0";
      } else {
        this.index = "1";
      }
      this.setDefinitionTheme(this.index);
    },
  },
  mounted() {
    this.definitionTheme();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.toggle__theme {
  display: flex;
  border-radius: var(--radius-eigh);
  box-shadow: var(--shadow);
  overflow: hidden;

  & button {
    padding: 8px;
    width: 40px;
    height: 40px;
    transition: var(--transition);
    background: var(--transparent);
    @include _768 {
      padding: 10px;
      width: 44px;
      height: 44px;
    }
  }

  & .active {
    box-shadow: var(--shadow-inset);
  }
}
</style>
