<template>
  <div class="toggle__theme">
    <transition name="fade">
      <span v-if="isShowInformation">{{ $t("changeTheme") }}🤔</span>
    </transition>
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
      index: 0,
      isShowInformation: false,
    };
  },
  components: {
    IconSun,
    IconMoon,
  },
  methods: {
    ...mapMutations(["setDefinitionTheme"]),
    async toggle(idx) {
      if (this.index !== idx) {
        this.index = idx;
        localStorage.setItem("theme", this.index);
        this.definitionTheme();
      }
    },

    definitionTheme() {
      if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") === "0") {
          this.index = 0;
        } else {
          this.index = 1;
        }
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.index = 1;
      }

      this.setDefinitionTheme(this.index);
    },
    showInformation() {
      setTimeout(() => {
        this.isShowInformation = true;
      }, 1000);
      setTimeout(() => {
        this.isShowInformation = false;
      }, 10000);
    },
  },
  mounted() {
    this.definitionTheme();
    this.showInformation();
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

  & span {
    position: absolute;
    left: 80px;
    top: -24px;
    background: var(--gradient);
    padding: 2px 6px;
    border-radius: var(--radius-four);
    color: var(--sixth);
  }

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
