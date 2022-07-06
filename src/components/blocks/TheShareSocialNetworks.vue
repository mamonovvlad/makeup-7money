<template>
  <div class="share-social-networks">
    <div class="stylish-wrapper">
      <div class="text">
        <icon-share></icon-share>
        <span>Поделиться с друзяьми в соц сетях: </span>
      </div>
      <the-social-network></the-social-network>
    </div>
  </div>
</template>

<script>
import TheSocialNetwork from "./TheSocialNetwork.vue";
//Icons
import IconShare from "../icons/IconShare.vue";
export default {
  name: "TheShareSocialNetworks",
  components: {
    IconShare,
    TheSocialNetwork,
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.share-social-networks {
  margin-top: 20px;
  box-shadow: var(--shadow);

  & .stylish-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    @include _768 {
      flex-direction: column;
      row-gap: 20px;
    }
  }

  & .text {
    display: flex;
    align-items: center;
    column-gap: 10px;

    & svg {
      width: 25px;
      @include _768 {
        display: none;
      }
    }

    & span {
      font-size: 18px;
      color: var(--quaternary);
      @include _768 {
        font-size: 14px;
      }
    }
  }

  & .social-network {
    display: flex;
    column-gap: 20px;

  }
}
</style>