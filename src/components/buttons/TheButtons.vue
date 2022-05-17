<template>
  <button class="button--small" :class="{'active': visible}"
          @click="open">
    <span class="icon" :class="className">
      <slot name="icon"></slot>
      <transition :name="animate">
        <slot name="block" v-if="visible"></slot>
      </transition>
    </span>
  </button>
</template>

<script>

export default {
  props: {
    animate: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  inject: ["isAccordion"],
  name: "TheButtons",
  data() {
    return {
      index: -1,
    };
  },
  computed: {
    visible() {
      return this.index === this.isAccordion.active;
    },
  },
  methods: {
    open() {
      if (this.visible) {
        this.isAccordion.active = null;
      } else {
        this.isAccordion.active = this.index;
      }
    },
    activeAccount() {
      let login = document.getElementById("login");
      let buttonAccount = document.querySelector(".button__account");
      if (login.value === "1") {
        buttonAccount.classList.add("account--active");
      }

    },
  },
  mounted() {
    this.activeAccount();
    this.index = this.isAccordion.count++;
  },
};
</script>

<style lang="scss">
@import "../../source/scss/utils/mixin";

.button--small {
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 50px;
  z-index: 2;
  background: var(--transparent);
  transition: var(--transition);
  @include _768 {
    width: 40px;
    height: 40px;
  }

  &:hover {
    & .icon {
      box-shadow: var(--shadow-inset);
    }
  }


  & .icon {
    position: absolute;
    display: block;
    box-shadow: var(--shadow);
    border-radius: var(--radius-four);
    width: 100%;
    height: 100%;
    padding: 12px;
    top: 0;
    background: var(--secondary);
    transition: var(--transition);
    @include _768 {
      padding: 9px;
    }
  }

  & .button__share,
  & .button__languages {
    overflow: hidden;
  }

  & .account--active {
    background: var(--primary);
    box-shadow: var(--shadow-primary);

    & svg {
      color: var(--seventh);
    }
    &:hover {
      box-shadow: var(--shadow-primary-inset);
    }
  }

  &.active {
    & .icon {
      box-shadow: var(--shadow-inset);
    }

    & .button__share {
      height: 300px;
    }

    & .button__languages {
      height: 135px;
    }
    & .account--active {
      box-shadow: var(--shadow-primary-inset);
    }
  }

  .button__share .social-network {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    margin-top: 20px;
    transition: var(--transition);
  }
}

</style>
