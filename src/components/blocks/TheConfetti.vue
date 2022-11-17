<template>
  <div class="confetti">
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
  </div>
</template>

<script>
export default {
  name: "TheConfetti",
};
</script>

<style lang="scss">
$duration: 1000;
@function randomNum($min, $max) {
  $rand: random();
  $randomNum: $min + floor($rand * (($max - $min) + 1));

  @return $randomNum;
}

.confetti {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.confetti-piece {
  position: absolute;
  width: 6px;
  height: 10px;
  background: var(--yellow);
  top: -10px;
  opacity: 0;

  @for $i from 1 through 13 {
    &:nth-child(#{$i}) {
      left: $i * 7%;
      transform: rotate(#{randomNum(-180, 180)}deg);
      animation: makeItRain $duration * 1ms infinite ease-out;
      animation-delay: #{randomNum(0, $duration * 0.5)}ms;
      animation-duration: #{randomNum($duration * 0.5, $duration * 1)}ms;
    }
  }

  &:nth-child(odd) {
    background: var(--blue);
  }

  &:nth-child(even) {
    z-index: 1;
  }

  &:nth-child(4n) {
    width: 5px;
    height: 13px;
    animation-duration: $duration * 2ms;
    background: var(--green);
  }

  &:nth-child(3n) {
    width: 5px;
    height: 13px;
    animation-duration: $duration * 2.5ms;
    animation-delay: $duration * 1ms;
  }

  &:nth-child(4n-7) {
    background: var(--red);
  }
}

@keyframes makeItRain {
  from {
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  to {
    transform: translateY(96px);
  }
}
</style>
