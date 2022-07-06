<template>
  <div class="toggle__theme">
    <button v-for="(button ,idx) in buttons" :key="button.id" :class="{active: index === idx}" @click="toggle(idx)">

      <component :is="button.icon"></component>

    </button>
  </div>
  <button class="toggle__them">tyuty</button>
</template>

<script>
import html2canvas from "html2canvas";
import IconSun from "../icons/IconSun.vue";
import IconMoon from "../icons/IconMoon.vue";


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
      ///
      showCanvas: false,
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
    };
  },
  components: {
    IconSun,
    IconMoon,
    html2canvas,
  },
  // render: async function(createElement,startDate, duration, finalRadius, pageY, pageX) {
  //   const canvas = await html2canvas(document.documentElement);
  //   const ctx = canvas.getContext("2d");
  //   const diff = Date.now() - startDate;
  //   const progress = diff / duration;
  //   const radius = finalRadius * progress;
  //  return   createElement(
  //
  //
  //   console.log(ctx);
  //   // ctx.beginPath();
  //   // ctx.fillColor = "red";
  //   ctx.arc(pageX, pageY, radius, 0, 2 * Math.PI);
  //   ctx.fill();
  //   if (progress < 1) requestAnimationFrame(render())
  // )
  // },
  methods: {
    // test: async function(e) {
    //   const canvasWrapper = document.querySelector(".canvas-wrapper");
    //   const duration = 400;
    //   this.showCanvas = true;
    //   const canvas = await html2canvas(document.documentElement);
    //   canvasWrapper.appendChild(canvas);
    //
    //
    //   const { pageX, pageY } = e;
    //   const { clientWidth, clientHeight } = document.body;
    //   const startDate = Date.now();
    //   const ctx = canvas.getContext("2d");
    //   ctx.globalCompositeOperation = "destination-out";
    //
    //
    //   const finalRadius = Math.sqrt(
    //     clientWidth * clientWidth,
    //     clientHeight * clientHeight,
    //   );
    //
    //   // const render = () => {
    //   //   const diff = Date.now() - startDate;
    //   //   const progress = diff / duration;
    //   //   const radius = finalRadius * progress;
    //   //   ctx.beginPath();
    //   //   ctx.fillColor = "red";
    //   //   ctx.arc(pageX, pageY, radius, 0, 2 * Math.PI);
    //   //   ctx.fill();
    //   //   if (progress < 1) requestAnimationFrame(render);
    //   // };
    //   this.render(startDate, ctx, duration, finalRadius, pageY, pageX);
    //   requestAnimationFrame(this.render);
    //
    //
    //   setTimeout(() => {
    //     canvasWrapper.removeChild(canvasWrapper.querySelector("canvas"));
    //     this.showCanvas = false;
    //   }, duration);
    //
    //
    // },

    // drawLine(x1, y1, x2, y2) {
    //   let ctx = this.canvas;
    //   ctx.beginPath();
    //   ctx.strokeStyle = "black";
    //   ctx.lineWidth = 1;
    //   ctx.moveTo(x1, y1);
    //   ctx.lineTo(x2, y2);
    //   ctx.stroke();
    //   ctx.closePath();
    // },
    // beginDrawing(e) {
    //   this.x = e.offsetX;
    //   this.y = e.offsetY;
    //   this.isDrawing = true;
    // },
    // keepDrawing(e) {
    //   if (this.isDrawing === true) {
    //     this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
    //     this.x = e.offsetX;
    //     this.y = e.offsetY;
    //   }
    // },
    // stopDrawing(e) {
    //   if (this.isDrawing === true) {
    //     this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
    //     this.x = 0;
    //     this.y = 0;
    //     this.isDrawing = false;
    //   }
    // },
    toggle(idx) {
      this.index = idx;
      localStorage.setItem("theme", this.index);
      this.definitionTheme();
    },
    definitionTheme() {
      if (localStorage.getItem("theme") === "0") {
        this.index = 0;
      } else {
        this.index = 1;
      }
      this.$emit("callback", this.index);
    },
  },
  mounted() {
    this.definitionTheme();
    test();
    //  let c = document.getElementById("myCanvas");
    //
    // this.canvas = c.getContext("2d");
  },
};

function test() {
  document.querySelector(".toggle__them").addEventListener("click", async (e) => {
    console.log("1");
    let canvasWrapper = document.querySelector(".canvas-wrapper");
    const duration = 900;
    const canvas = await html2canvas(document.documentElement);
    // canvasWrapper.forEach(item => {
    //   item.appendChild(canvas);
    //   item.style.display = "block";
    // });
    console.log(canvas);
    canvasWrapper.appendChild(canvas);
    canvasWrapper.style.display = "block";

    const { pageX, pageY } = e;
    const { clientWidth, clientHeight } = document.body;
    const startDate = Date.now();
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    // ctx.fillColor = "white";
    const finalRadius = Math.sqrt(
      clientWidth * clientWidth,
      clientHeight * clientHeight,
    );

    const render = () => {
      const diff = Date.now() - startDate;
      const progress = diff / duration;
      const radius = finalRadius * progress;
      ctx.beginPath();
      ctx.arc(pageX, pageY, radius, 0, 2 * Math.PI);//

      ctx.fill();//
      if (progress < 1) requestAnimationFrame(render);//
      // console.log(ctx);
    };


    requestAnimationFrame(render);
    if (document.querySelector(".app").getAttribute("data-theme") === "dark") {
      document.querySelector(".app").setAttribute("data-theme", "light");
    } else {
      document.querySelector(".app").setAttribute("data-theme", "dark");
    }


    setTimeout(() => {
      // canvasWrapper.forEach(item => {
      //   // item.removeChild(item.querySelector("canvas"));
      //   item.style.display = "none";
      // });
      canvasWrapper.removeChild(canvasWrapper.querySelector("canvas"));
      canvasWrapper.style.display = "none";

    }, duration);
  });
}

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
