<template>
  <button class="copy" @click.prevent="copy(copyText)" v-if="copyText.length > 0">
    <span v-if="isShow">
      Скопировано
    </span>
    <icon-copy></icon-copy>
  </button>
</template>

<script>
import IconCopy from "../icons/IconCopy.vue";

export default {
  name: "TheCopyText",
  props: {
    copyText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    IconCopy,
  },
  methods: {
    copy(text) {
      try {
        navigator.clipboard.writeText(text);
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 1500);
      } catch (e) {
        throw e;
      }
    },
  },
};
</script>

<style lang="scss">
.copy {
  position: relative;
  height: 15px;
  width: 15px;
  color: var(--primary);
  display: inline-flex;
  margin-left: 5px;

  & span {
    position: absolute;
    width: max-content;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: var(--radius-four);
    box-shadow: var(--shadow);
    background: var(--seventh);
    color: var(--quaternary);
    padding: 4px 6px;
    z-index: 1;
  }
}
</style>