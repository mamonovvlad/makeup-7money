import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isShow: false,
    show_entrance: false,
    active_entrance: false,
    active_registration: false,
    account_active: false,
    recovery: false,

    block_russia: false,
    block_greatbritain: false,
    block_ukraine: false,
  },
  mutations: {
    recovery(state) {
      state.recovery = true;
      state.show_entrance = false;
      state.active_entrance = false;
      state.active_registration = false;
      state.account_active = false;

      state.block_russia = false;
      state.block_greatbritain = false;
      state.block_ukraine = false;
    },
    registration(state) {
      state.show_entrance = true;
      state.active_entrance = false;
      state.active_registration = true;
      state.account_active = false;
    },
    entrance(state) {
      state.show_entrance = true;
      state.active_entrance = true;
      state.active_registration = false;
      state.account_active = false;
    },
    switchPage(state) {
      state.active_entrance = !state.active_entrance;
      state.active_registration = !state.active_registration;
    },
    close_modal(state) {
      state.recovery = false;
      state.show_entrance = false;
      state.active_entrance = false;
      state.active_registration = false;
      state.account_active = false;
    },
    russian_language(state) {
      state.block_russia = true;
      state.block_greatbritain = false;
      state.block_ukraine = false;
    },
    greatbritain_language(state) {
      state.block_russia = false;
      state.block_greatbritain = true;
      state.block_ukraine = false;
    },
    ukraine_language(state) {
      state.block_russia = false;
      state.block_greatbritain = false;
      state.block_ukraine = true;
    },
  },
  actions: {
    registrationShow({ commit }) {
      commit("registration");
    },
    entranceShow({ commit }) {
      commit("entrance");
    },
    modalHide({ commit }) {
      commit("close_modal");
    },
    switchToggle({ commit }) {
      commit("switchPage");
    },
    recoveryShow({ commit }) {
      commit("recovery");
    },
    russian_language({ commit }) {
      commit("russian_language");
    },
    greatbritain_language({ commit }) {
      commit("greatbritain_language");
    },
    ukraine_language({ commit }) {
      commit("ukraine_language");
    },
  },
  getters: {
    isShow(state) {
      return state.isShow;
    },
    show_entrance(state) {
      return state.show_entrance;
    },
    active_registration(state) {
      return state.active_registration;
    },
    active_entrance(state) {
      return state.active_entrance;
    },
    account_active(state) {
      return state.account_active;
    },
    recovery(state) {
      return state.recovery;
    },
    block_russia(state) {
      return state.block_russia;
    },
    block_greatbritain(state) {
      return state.block_greatbritain;
    },
    block_ukraine(state) {
      return state.block_ukraine;
    },
  },
});

export default store;
