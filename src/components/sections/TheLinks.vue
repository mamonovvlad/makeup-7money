<template>
  <section class="links stylish-wrapper" v-if="showHideBlock">
    <div class="items" :class="{ active: showLinks }">
      <a v-for="(link,idx) in links" :key="idx" :href="link.url">
        <span v-if="getLanguage === 'en'">{{ link.name_en }}</span>
        <span v-else-if="getLanguage === 'ua'">{{ link.name_ua }}</span>
        <span v-else>{{ link.name_ru }}</span>
      </a>
    </div>
    <button @click="showLinks = !showLinks">
      <strong>
        <span v-if="!showLinks"> {{ $t("showMore") }}</span>
        <span v-else> {{ $t("hide") }}</span>
      </strong>
    </button>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "TheLinks",
  data() {
    return {
      links: [],
      showLinks: false,
    };
  },
  computed: {
    ...mapGetters(["blockHide", "getLanguage"]),
    showHideBlock() {
      return this.blockHide;
    },
  },
  methods: {
    getLinks() {
      axios.get(process.env.PROXY2 + "/v1/course/links?access-token=EFjko3OineBf8RQCth33wpC0dZqM4CyO&_format=json").then((res) => {
        this.links = res.data;
      });
    },
  },
  mounted() {
    this.getLinks();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.links {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 20px 10px;

  & .items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    transition: var(--transition);
    overflow: hidden;
    max-height: 65px;
    gap: 8px;
    @include _768 {
      grid-template-columns: repeat(3, 1fr);
    }
    @include _576 {
      grid-template-columns: repeat(1, 1fr);
    }

    & a {
      color: var(--primary);
      word-break: break-all;
      text-decoration: none;
      @include crop-height(1);
    }
  }

  & button {
    max-width: max-content;
    align-self: center;
    margin-top: 5px;
    background-color: var(--transparent);
    transition: var(--transition);

    &:hover {
      color: var(--primary);
    }
  }

  & .active {
    max-height: 800px;
    overflow-y: auto;
  }
}
</style>
