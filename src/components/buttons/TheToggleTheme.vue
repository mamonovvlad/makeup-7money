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
    <div ref="canvasWrapper" class="canvas-wrapper"></div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
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
    };
  },
  components: {
    IconSun,
    IconMoon,
  },
  methods: {
    ...mapMutations(["setDefinitionTheme"]),
    //Написанно в перемешку
    async toggle(idx, e) {
      let duration = 400;
      let x = e.clientX;
      let y = e.clientY;
      let canvasWrapper = document.querySelector(".canvas-wrapper");
      if (this.index !== idx) {
        await html2canvas(document.documentElement, {
          type: "view",
        }).then(function (canvas) {
          const ctx = canvas.getContext("2d");
          let startDate = Date.now();
          const { clientWidth, clientHeight } = document.body;
          const finalRadius = Math.sqrt(
            clientWidth * clientWidth,
            clientHeight * clientHeight
          );
          canvasWrapper.appendChild(canvas);
          canvasWrapper.style.display = "block";
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillColor = "white";

          const render = () => {
            const diff = Date.now() - startDate;
            const progress = diff / duration;
            const radius = finalRadius * progress;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            if (progress < 1) requestAnimationFrame(render);
          };
          requestAnimationFrame(render);
        });
        this.index = idx;
        setTimeout(() => {
          this.$refs.canvasWrapper.removeChild(
            this.$refs.canvasWrapper.querySelector("canvas")
          );
          this.$refs.canvasWrapper.style.display = "none";
        }, duration);

        localStorage.setItem("theme", this.index);

        this.definitionTheme();
      }
    },

    definitionTheme() {
      if (localStorage.getItem("theme") === "0") {
        this.index = 0;
      } else {
        this.index = 1;
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
  }

  & .active {
    box-shadow: var(--shadow-inset);
  }
}
</style>
