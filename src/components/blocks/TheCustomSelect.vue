<template>
  <div class="custom-select" ref="customSelect" :class="{ active: isShow }">
    <button
      type="button"
      @click="showSelect"
      class="select form-group"
      ref="select"
      data-value=""
      data-id=""
    >
      <span ref="selectName" class="select-name">
        <slot name="name"></slot>
      </span>
      <icon-arrow></icon-arrow>
    </button>
    <ul class="options">
      {{
        selectOption
      }}
      <li v-for="option in options.dropDownCities">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
import IconArrow from "../icons/IconArrow.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    options: {
      type: [Array, Object],
    },
  },
  name: "TheCustomSelect",
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    IconArrow,
  },
  computed: {
    ...mapGetters(["calculateData"]),
    selectOption() {
      for (let option in this.arr.dropDownCities) {
        return option;
      }
    },
  },
  methods: {
    showSelect() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss"></style>
