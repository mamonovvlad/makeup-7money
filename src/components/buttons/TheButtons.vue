<template>
  <div class="block">
    <div
      v-for="(button, idx) in buttons"
      :key="idx"
      class="button--small"
      :class="{ active: button.isActive }"
    >
      <span class="icon" :class="button.className">
        <button class="btn" @click="openMenu(idx)">
          <component :is="button.icon"></component>
        </button>
        <transition :name="button.animate">
          <component
            :is="button.block"
            @open="indexTransfer"
            v-show="button.isActive"
          >
          </component>
        </transition>
      </span>
    </div>
    <transition name="slide-fade">
      <the-burger @hideBurger="isBurger = false" v-if="isBurger"></the-burger>
    </transition>
  </div>
</template>

<script>
//Images
import IconAccount from "../icons/IconAccount.vue";
import IconShare from "../icons/IconShare.vue";
import IconBurger from "../icons/IconBurger.vue";
//Block
import TheLanguages from "../blocks/TheLanguages.vue";
import TheAuthorizationButtons from "./TheAuthorizationButtons.vue";
import TheSocialNetwork from "../blocks/TheSocialNetwork.vue";
import TheBurger from "../popups/TheBurger.vue";

export default {
  name: "TheButtons",
  data() {
    return {
      index: null,
      isBurger: false,
      buttons: [
        {
          id: 0,
          icon: "the-languages",
          className: "languages",
          isActive: false,
        },
        {
          id: 1,
          icon: "icon-account",
          block: "the-authorization-buttons",
          className: "button__account",
          isActive: false,
          animate: "fade",
        },
        {
          id: 2,
          icon: "icon-share",
          block: "the-social-network",
          className: "button__share",
          isActive: false,
        },
        {
          id: 3,
          icon: "icon-burger",
        },
      ],
    };
  },
  components: {
    IconAccount,
    IconShare,
    IconBurger,
    TheLanguages,
    TheAuthorizationButtons,
    TheSocialNetwork,
    TheBurger,
  },
  methods: {
    indexTransfer(idx) {
      this.$emit("authorization", idx);
    },
    openMenu(idx) {
      for (let i = 0; i < this.buttons.length; i++) {
        this.buttons[i].isActive = false;
      }
      if (this.index === idx) {
        this.buttons[idx].isActive = false;
        this.index = null;
      } else if (idx === 3) {
        this.isBurger = true;
      } else {
        this.buttons[idx].isActive = true;
        this.index = idx;
      }
    },

    hideMenu(e) {
      let target = e.target;
      if (!target.classList.contains("btn")) {
        for (let i = 0; i < this.buttons.length; i++) {
          if (i !== 3) {
            this.buttons[i].isActive = false;
            this.index = null;
          }
        }
        if (!target.classList.contains("burger__wrapper")) {
          this.isBurger = false;
        }
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.hideMenu);
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.button--small {
  position: relative;
  width: 50px;
  height: 50px;
  @include _768 {
    width: 40px;
    height: 40px;
  }

  &:hover {
    & .icon {
      box-shadow: var(--shadow-primary-inset);
    }
    @include _768 {
      & .icon {
        box-shadow: unset;
      }
    }
  }

  & .icon {
    position: absolute;
    display: block;
    box-shadow: var(--shadow);
    border-radius: var(--radius-four);
    width: 100%;
    height: 100%;
    background: var(--seventh);
    transition: all 0.3s ease;
    z-index: 1;
  }

  & .btn {
    cursor: pointer;
    width: 100%;
    padding: 12px;
    background: transparent;
    @include _768 {
      padding: 8px;
    }

    &:after {
      content: "";
      background: transparent;
      position: absolute;
      height: 50px;
      width: 50px;
      left: 0;
      top: 0;
      @include _768 {
        width: 40px;
        height: 40px;
      }
    }
  }

  & .button__share,
  & .languages {
    overflow: hidden;
  }

  & .button__share .social-network {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
    margin-top: 10px;
    transition: var(--transition);

    & img {
      height: 25px;
    }
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
      @include _768 {
        height: 285px;
      }
    }

    & .languages {
      z-index: 1;
      height: 130px;
      @include _768 {
        height: 115px;
      }
    }

    & .account--active {
      box-shadow: var(--shadow-primary-inset);
    }
  }
}
</style>
