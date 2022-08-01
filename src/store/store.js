import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    theme: "light",
    allCurrencies: {},
    sellCurrencies: {},
    buyCurrencies: {},
    // groups
    currencyGroups: {},
    sellCurrencyGroup: {},
    sellCurrencyGroupId: null,
    buyCurrencyGroup: {},
    buyCurrencyGroupId: null,
    //
  }, //Хранения данных
  mutations: {
    setDefinitionTheme(state, index) {
      if (index === 0) {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
    setGroupsAndCurrencies(state, response) {
      state.currencyGroups = response.data.groups;
      state.allCurrencies = response.data.allCurrencies;
      state.sellCurrencies = response.data.allCurrencies;
      state.buyCurrencies = response.data.buyCurrencies;
    },
    setCurrencyGroup(state, payload) {
      // this.stopTimer();
      state[payload[0] + "CurrencyGroup"] = state.currencyGroups[payload[1]];
      state[payload[0] + "CurrencyGroupId"] =
        state.currencyGroups[payload[1]].id;
    },
    setResetCurrencyGroup(state, payload) {
      // this.stopTimer();
      state[payload + "CurrencyGroup"] = {};
      state[payload + "CurrencyGroupId"] = null;
    },
  }, //Функция для изменения state
  actions: {
    fetchGroupsAndCurrencies({ commit, getters }) {
      return axios
        .get(
          "http://proxy.local/" +
            getters.getLang +
            "/json/get-groups-and-currencies"
        )
        .then(function (response) {
          commit("setGroupsAndCurrencies", response);
        })
        .then(function (response) {
          // self.checkLastCurrencies();
          // self.checkQueryParameters();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }, //Функции асинхронные
  getters: {
    getLang() {
      if (document.getElementById("language").value === "en") {
        return "en";
      } else if (document.getElementById("language").value === "ua") {
        return "ua";
      }
      return "";
    },
    getSellCurrencyGroup(state) {
      return state.sellCurrencyGroup;
    },
    getBuyCurrencyGroup(state) {
      return state.buyCurrencyGroup;
    },
    getSellCurrencyGroupId(state) {
      return state.sellCurrencyGroupId;
    },
    getBuyCurrencyGroupId(state) {
      return state.buyCurrencyGroupId;
    },
    getCurrencyGroups(state) {
      return state.currencyGroups;
    },
    allCurrencies(state) {
      return state.allCurrencies;
    },
    buyCurrencies(state) {
      return state.buyCurrencies;
    },
    colorSpectrum(state) {
      return state.theme;
    },
  }, // Получения state
});
export default store;
