<template>
  <div class="side-panel">
    <transition name="animate-right">
      <nav class="account-navigation" v-if="isActive">
        <div class="side-panel__links">
          <slot name="links"></slot>
        </div>
        <div class="buttons">
          <slot name="buttons"></slot>
        </div>
      </nav>
    </transition>
    <the-toggle @click.native="isToggleNav"></the-toggle>
  </div>
</template>

<script>
import TheToggle from "../buttons/TheToggle.vue";

export default {
  name: "TheNav",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  components: {
    TheToggle,
  },
  methods: {
    isToggleNav() {
      this.isActive = !this.isActive;
    },
    isShowNav() {
      this.isActive = window.innerWidth > 768;
    },
  },
  mounted() {
    this.isShowNav();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.side-panel {
  border-right: 2px solid var(--secondary);
  @include _768 {
    border-width: 0;
  }

  & .button--toggle {
    @include _768 {
      display: flex;
    }
  }

  &__links,
  & .buttons {
    display: flex;
    flex-direction: column;
  }

  &__links {
    margin-bottom: 40px;
    @include _992 {
      margin-bottom: 20px;
    }
    @include _768 {
      margin-bottom: 0;
      row-gap: 15px;
    }

    & a {
      display: flex;
      border-radius: var(--radius-four);

      & svg {
        width: 17px;
        margin-right: 10px;
        color: var(--ternary);
        @include _768 {
          margin-right: 0;
        }
      }
    }

    & .active {
      box-shadow: var(--shadow);
      color: var(--quaternary);
      font-weight: 500;

      & svg {
        color: var(--primary);
      }
    }
  }
}

.account-navigation {
  padding-right: 20px;
  @include _768 {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: var(--secondary);
    padding: 15px;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    z-index: 2;
  }

  & a {
    font-size: 18px;
    text-decoration: none;
    padding: 14px 20px;
    white-space: nowrap;
    @include _1200 {
      font-size: 16px;
    }
    @include _992 {
      font-size: 14px;
      padding: 12px 15px;
    }
    @include _768 {
      font-size: 0;
      padding: 10px;
    }
  }

  & .buttons {
    text-transform: uppercase;
    row-gap: 20px;
    margin-left: 20px;
    @include _992 {
      margin-left: 14px;
      row-gap: 16px;
    }
    @include _768 {
      display: none;
    }

    & a {
      border: 2px solid var(--ternary);
      border-radius: var(--radius-eigh);
      text-align: center;
      transition: var(--transition);

      &:hover {
        background-color: var(--ternary);
        color: var(--sixth);
      }
    }
  }
}
</style>
