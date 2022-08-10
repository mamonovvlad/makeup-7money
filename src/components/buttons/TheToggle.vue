<template>
  <button class="button--toggle" @click="isToggleClass">
    <svg
      class="ham hamRotate ham1"
      viewBox="0 0 100 100"
      width="50"
      :class="{ active: isActive }"
    >
      <path
        class="line top"
        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
      />
      <path class="line middle" d="m 30,50 h 40" />
      <path
        class="line bottom"
        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "TheToggle",
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    isToggleClass() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.button--toggle {
  position: fixed;
  right: 10px;
  top: 100px;
  display: none;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-four);
  box-shadow: var(--shadow);
  background: var(--secondary);
  z-index: 2;

  & .ham {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: transform 400ms;
    user-select: none;
  }

  & .hamRotate.active {
    transform: rotate(45deg);
  }

  & .hamRotate180.active {
    transform: rotate(180deg);
  }

  & .line {
    fill: none;
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
    stroke: var(--primary);
    stroke-width: 5.5;
    stroke-linecap: round;
  }

  & .ham1 .top {
    stroke-dasharray: 40 139;
  }

  & .ham1 .bottom {
    stroke-dasharray: 40 180;
  }

  & .ham1.active .top {
    stroke-dashoffset: -98px;
  }

  & .ham1.active .bottom {
    stroke-dashoffset: -138px;
  }
}
</style>
