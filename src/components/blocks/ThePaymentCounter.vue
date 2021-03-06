<template>
  <div class="counter">
    <transition name="animate-right">
      <div class="wrapper" v-show="isActive">
        <slot name="check-status"></slot>
        <div class="countdown">
          <h4>
            Осталось времени на оплату
          </h4>
          <div class="clock"></div>
        </div>
        <slot name="information"></slot>
        <slot name="cancel-operation"></slot>
      </div>
    </transition>
    <the-toggle @click.native="isToggleNav"></the-toggle>
  </div>
</template>

<script>
import TheToggle from "../buttons/TheToggle.vue";

export default {
  name: "ThePaymentCounter",
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

.counter {
  & .button--toggle {
    @include _992 {
      display: flex;
    }
  }

  & .wrapper {
    background: var(--secondary);
    padding: 20px;
    height: 100%;
    @include _992 {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
    }
  }

  & .close {
    margin-top: 20px;
  }

  & .button {
    width: 100%;
  }

  & .line {
    border-color: var(--fifth);
    margin: 20px 0;
  }

  & .info {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &__wrapper {
      display: flex;
      justify-content: space-between;

      & strong {
        color: var(--quaternary);
      }
    }
  }

  & .clock {
    display: flex;
    justify-content: center;
    margin: 10px 0 0 0;

    & .days,
    & .hours,
    & .minutes,
    & .flip-clock-label,
    & ul:first-child,
    & ul:nth-child(2),
    & ul:nth-child(3),
    & ul:nth-child(4),
    & ul:nth-child(5),
    & ul:nth-child(6) {
      display: none;
    }

    & ul {
      @include _576 {
        width: 55px;
      }
    }

    & .flip {
      box-shadow: var(--shadow);
    }

    & .inn {
      color: var(--quaternary);
    }

    & .inn,
    & .flip {
      background: var(--secondary);
    }
  }

  & .countdown {
    & h4 {
      text-align: center;
      margin-top: 15px;
    }
  }
}

.flip-clock-wrapper {
  & ul {
    position: relative;
    margin: 5px;
    width: 60px;
    font-weight: 700;
    border-radius: var(--radius-four);
    overflow: hidden;
  }

  & li {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 87px;
  }

  & a {
    cursor: default;

    & div {
      z-index: 1;
      position: absolute;
      left: 0;
      width: 100%;
      height: 50%;
      font-size: 80px;
      overflow: hidden;
      outline: 1px solid transparent;

      & .inn {
        position: absolute;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 200%;
        text-align: center;
        font-size: 70px;
      }
    }
  }

  & .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  & .up {
    transform-origin: 50% 100%;
    top: 0;

    & .inn {
      top: 0;
    }
  }

  & .down {
    transform-origin: 50% 0;
    bottom: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    & .inn {
      bottom: 0;
    }
  }

  & .flip-clock-before {
    z-index: 3;
  }

  & .flip {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
  }

  & .play li.flip-clock-active {
    animation: asd 0.01s 0.49s linear both;
    z-index: 5;
  }
}

.flip-clock-divider {
  position: relative;
  width: 20px;
  height: 100px;

  &:first-child {
    width: 0;
  }

}


.flip-clock-dot {
  display: block;
  background: var(--quaternary);
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  left: 5px;

  &.top {
    top: 30px;
  }

  &.bottom {
    bottom: 30px;
  }
}


.flip-clock-wrapper ul.play li.flip-clock-active .down {
  z-index: 2;
  animation: turn 0.5s 0.5s linear both;
}


.flip-clock-wrapper ul.play li.flip-clock-before .up {
  z-index: 2;
  animation: turn2 0.5s linear both;
}


.flip-clock-wrapper ul li.flip-clock-active {
  z-index: 3;
}

/* SHADOW */
.flip-clock-wrapper ul.play li.flip-clock-before .up .shadow {
  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0.1)), color-stop(100%, black));
  background: linear, top, rgba(0, 0, 0, 0.1) 0%, black 100%;
  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: -ms-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: linear, to bottom, rgba(0, 0, 0, 0.1) 0%, black 100%;
  animation: show 0.5s linear both;
}


/*DOWN*/
.flip-clock-wrapper ul.play li.flip-clock-before .down .shadow {
  background: -moz-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, black), color-stop(100%, rgba(0, 0, 0, 0.1)));
  background: linear, top, black 0%, rgba(0, 0, 0, 0.1) 100%;
  background: -o-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: -ms-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: linear, to bottom, black 0%, rgba(0, 0, 0, 0.1) 100%;
  animation: show 0.5s linear both;
}


</style>