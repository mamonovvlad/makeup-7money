<template>
  <div class="form-group" @click="showSelect">
    <div class="custom-select" ref="customSelect" :class="{ active: isShow }">
      <button type="button" class="select" ref="select" data-value="">
        <span ref="name">What do you want to eat for dinner?</span>
        <icon-arrow></icon-arrow>
      </button>
      <ul class="options">
        <li @click="selectOptions" v-for="option in options">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let options = ["Киев", "Львов", "Житомир", "Киев", "Львов", "Житомир"];
import IconArrow from "../icons/IconArrow.vue";
export default {
  name: "TheCustomSelect",
  components: { IconArrow },
  data() {
    return {
      options,
      isShow: false,
    };
  },
  methods: {
    showSelect() {
      this.isShow = !this.isShow;
    },
    selectOptions(event) {
      const text = event.target.innerText;
      this.$refs.customSelect.classList.remove("active");
      this.$refs.name.innerText = text;
      this.$refs.select.setAttribute("data-value", text);
    },
  },
};
</script>

<style lang="scss">
.custom-select {
  & .select {
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

  & .options {
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
      padding: 10px;
      transition: var(--transition);

      &:hover {
        background: var(--primary);
        color: var(--sixth);
      }
    }
  }

  &.active {
    & .select svg {
      transform: rotateZ(270deg);
    }

    & .options {
      height: max-content;
      max-height: 160px;
    }
  }
}
</style>
