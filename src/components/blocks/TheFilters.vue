<template>
  <ul class="filters">
    <li
      :class="{ 'active--filters': groupId == null }"
      @click="setResetGrout(type)"
    >
      ALL
    </li>
    <li
      v-for="(group, i) in getCurrencyGroups"
      :key="i"
      :class="{ 'active--filters': group.id === groupId }"
      @click="setGroup(type, i)"
    >
      {{ group.name }}
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheFilters",
  props: {
    type: {
      type: String,
    },
    groupId: {
      type: [Number, String],
    },
  },
  computed: {
    ...mapGetters(["getCurrencyGroups", "sellCurrencyId"]),
  },
  methods: {
    ...mapMutations(["setCurrencyGroup", "setResetCurrencyGroup"]),
    setGroup(type, idx) {
      this.setCurrencyGroup([type, idx]);
    },
    setResetGrout(type) {
      this.setResetCurrencyGroup(type);
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/utils/mixin";

.filters {
  display: flex;
  justify-content: space-between;
  margin: 22px 0 0;
  padding-bottom: 10px;
  @include _768 {
    margin: 12px 0 0;
    flex-wrap: wrap;
    row-gap: 6px;
  }

  & li {
    font-size: 12px;
    padding: 6px;
    cursor: pointer;
    transition: box-shadow 400ms ease;
    font-weight: 500;
    &:hover {
      box-shadow: var(--shadow);
      color: var(--primary);
      font-weight: 500;
      border-radius: var(--radius-four);
    }
  }
}

.active--filters {
  box-shadow: var(--shadow);
  color: var(--primary);
  font-weight: 500;
  border-radius: var(--radius-four);
}
</style>
