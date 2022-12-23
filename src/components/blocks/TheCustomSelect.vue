<template>
  <div class="form-group">
    <div class="custom-select" :class="{ active: isShow }">
      <button type="button" @click="showSelect" class="fa-select" data-value="">
        What do you want to eat for dinner?
        <icon-arrow></icon-arrow>
      </button>
      <ul class="fa-options">
        <li rel="Steak">Steak</li>
        <li rel="Fried rice">Fried rice</li>
        <li rel="Hamburger">Hamburger</li>
        <li rel="Hot pot">Hot pot</li>
        <li rel="Risotto">Risotto</li>
        <li rel="BBQ">BBQ</li>
        <li rel="Pizza">Pizza</li>
        <li rel="Fried chicken">Fried chicken</li>
        <li rel="Dumplings">Dumplings</li>
        <li rel="Dog food">Dog food</li>
      </ul>
    </div>
  </div>
</template>

<script>
// const selects = document.getElementsByClassName("fa-select");
// const options = document.querySelectorAll(".fa-options li");
//
// for (let i = 0; i < selects.length; i++) {
//   selects[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//   });
// }
//
// options.forEach((option) => {
//   option.addEventListener("click", () => {
//     const text = option.innerText;
//     const value = option.getAttribute("rel");
//     const selectDOM = option.parentNode.previousSibling.previousSibling;
//
//     selectDOM.classList.remove("active");
//     selectDOM.innerText = text;
//     selectDOM.setAttribute("data-value", value);
//   });
// });

import IconArrow from "../icons/IconArrow.vue";
export default {
  name: "TheCustomSelect",
  components: { IconArrow },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showSelect() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss">
$select-height: 40px;
$main-color: #3759af;

.custom-select {
  .fa-select {
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & svg {
      transition: var(--transition);
      transform: rotate(90deg);
    }
  }

  .fa-options {
    margin-top: 6px;
    width: 100%;
    height: 0;
    position: absolute;
    top: 100%;
    left: 0;
    overflow: auto;
    box-shadow: var(--shadow-inset);
    border-radius: var(--radius-four);
    background-color: var(--seventh);
    transition: var(--transition);
    z-index: 2;

    li {
      cursor: pointer;
      padding: 6px;
      margin: 6px 10px;
      transition: var(--transition);
      border-radius: var(--radius-four);

      &:hover {
        box-shadow: var(--shadow);
      }
    }
  }

  &.active {
    & .fa-select svg {
      transform: rotateZ(270deg);
    }

    & .fa-options {
      height: 160px;
    }
  }
}
</style>
