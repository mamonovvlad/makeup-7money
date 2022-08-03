import { createStore } from "vuex";
import axios from "axios";
import qs from "querystring-es3";

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
    //form
    sell_currency_id: null,
    buy_currency_id: null,
    sell_amount: 0,
    buy_amount: 0,
    sell_amount_with_commission: 0,
    buy_amount_with_commission: 0,
    sell_source: "",
    buy_target: "",
    is_verified: 0,
    city_id: null,
    // calculate data
    course: {},
    sellCurrency: {},
    buyCurrency: {},
    calculateData: {},
    type: "default",
    //
    showCurrencyExchange: false,
    currenciesHideSell: false,
    currenciesHideBuy: false,
    blockHide: false,
    detailsHide: false,
  }, //Хранения данных
  mutations: {
    setDocumentTitle(state) {
      document.title = state.calculateData.course_title;
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", state.calculateData.course_description);
    },
    setDefinitionTheme(state, index) {
      if (index === 0) {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
    setCalculateForm(state, response, refresh) {
      state.sellCurrencies = response.data.sellCurrencies;
      state.sell_currency_id = response.data.sell_currency_id;
      state.buyCurrencies = response.data.buyCurrencies;
      state.buy_currency_id = response.data.buy_currency_id;
      state.sellCurrency = response.data.sellCurrency;
      state.buyCurrency = response.data.buyCurrency;
      state.course = response.data.course;
      state.calculateData = response.data;
      state.sell_amount = response.data.sell_amount;
      state.sell_amount_with_commission =
        response.data.sell_amount_with_comission;
      state.buy_amount = response.data.buy_amount;
      state.buy_amount_with_commission =
        response.data.buy_amount_with_comission;
      if (refresh) state.sell_source = response.data.sell_source;
      if (refresh) state.buy_target = response.data.buy_target;
      this.commit("setDocumentTitle");
    },
    setGroupsAndCurrencies(state, response) {
      state.currencyGroups = response.data.groups;
      state.allCurrencies = response.data.allCurrencies;
      state.sellCurrencies = response.data.allCurrencies;
      state.buyCurrencies = response.data.buyCurrencies;
      this.commit("checkLastCurrencies");
      this.commit("checkQueryParameters");
    },
    setGroupsAndCurrenciesFromPage(state, json) {
      state.currencyGroups = json.groups;
      state.allCurrencies = json.allCurrencies;
      state.sellCurrencies = json.allCurrencies;
      state.buyCurrencies = json.buyCurrencies;
      this.commit("checkLastCurrencies");
      this.commit("checkQueryParameters");
    },
    setBuyCurrencies(state, response) {
      state.buyCurrencies = response.data;
    },
    setSellCurrencies(state, response) {
      state.sellCurrencies = response.data;
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
    checkLastCurrencies() {
      let inputHiddenLastSellId = document.getElementById(
        "inputHiddenLastSellId"
      );
      let inputHiddenLastBuyId = document.getElementById(
        "inputHiddenLastBuyId"
      );
      if (inputHiddenLastSellId && inputHiddenLastBuyId) {
        if (inputHiddenLastSellId.value > 0) {
          this.commit("setActiveCurrency", [
            "sell",
            parseInt(inputHiddenLastSellId.value),
            true,
            false,
            false,
          ]);
        }
        if (inputHiddenLastBuyId.value > 0) {
          this.commit("setActiveCurrency", [
            "buy",
            parseInt(inputHiddenLastBuyId.value),
            true,
            false,
            false,
          ]);
        }
      }
    },
    checkQueryParameters() {
      let isSetFrom = this.commit("checkQueryFromParameter");
      let isSetTo = this.commit("checkQueryToParameter");
      if (isSetFrom && isSetTo) {
        this.dispatch("calculateForm", ["default"]);
      }
    },
    checkQueryFromParameter(state) {
      let uri = window.location.search.substring(1);
      let params = new URLSearchParams(uri);
      let self = this;
      let curFrom = params.get("cur_from");
      if (curFrom !== undefined) {
        Object.values(state.sellCurrencies).forEach(function (sellCurrency) {
          if (sellCurrency.code === curFrom) {
            self.commit("setActiveCurrency", ["sell", sellCurrency.id]);
            return sellCurrency.code === curFrom;
          }
        });
      }
    },
    checkQueryToParameter(state) {
      let self = this;
      let uri = window.location.search.substring(1);
      let params = new URLSearchParams(uri);
      let curTo = params.get("cur_to");
      if (curTo !== undefined) {
        Object.values(state.buyCurrencies).forEach(async function (
          buyCurrency
        ) {
          if (buyCurrency.code === curTo) {
            self.commit("setActiveCurrency", [
              "buy",
              buyCurrency.id,
              true,
              false,
            ]);
            return buyCurrency.code === curTo;
          }
        });
      }
    },
    setActiveCurrency(state, arr) {
      if (arr[0] === "sell" && arr[3]) {
        this.commit("trashClick");
      }
      // this.stopTimer();
      state[arr[0] + "_currency_id"] = arr[1];
      this.commit(`${arr[0]}HideBlock`);
      if (state.sell_currency_id === null && state.buy_currency_id !== null) {
        this.dispatch("fetchSellCurrencies");
      }
      if (state.sell_currency_id !== null && state.buy_currency_id === null) {
        this.dispatch("fetchBuyCurrencies");
      }
      if (
        arr[2] &&
        state.sell_currency_id !== null &&
        state.buy_currency_id !== null
      ) {
        this.dispatch("calculateForm", [store.getters.getType, true]);
        if (arr[4]) {
          setTimeout(function () {
            this.commit("setUrl");
          }, 1000);
        }
      }
    },
    setUrl(state, getters) {
      let url = "";
      if (getters.getLanguage !== "ru") {
        url += "/" + getters.getLanguage;
      }
      if (state.calculateData.length === 0) {
        history.pushState(false, document.title, url);
      } else {
        url +=
          "/exchange/" +
          state.sellCurrency.code.toLowerCase() +
          "/" +
          state.buyCurrency.code.toLowerCase();
        history.pushState({}, document.title, url);
      }
    },
    setRefresh(state) {
      if (!state.calculateData || state.calculateData.isBackExchange !== 1) {
        return false;
      }
      let tempId = state.buy_currency_id;
      state.buy_currency_id = state.sell_currency_id;
      state.sell_currency_id = tempId;
      if (state.sell_currency_id !== null && state.buy_currency_id !== null) {
        this.dispatch("calculateForm", [store.getters.getType, true]);
      }
    },
    callbackTimerFinish() {
      this.dispatch("calculateForm", [store.getters.getType]);
    },
    trashClick(state) {
      this.commit("deleteAllHistory");
      state.showCurrencyExchange = false;
      state.currenciesHideSell = true;
      state.currenciesHideBuy = true;
      state.blockHide = true;
      state.detailsHide = false;
      state.sell_currency_id = null;
      state.buy_currency_id = null;
      // this.stopTimer();
    },
    hideBlocks(state) {
      let Give = state.sell_currency_id !== null;
      let Get = state.buy_currency_id !== null;

      if (Give && Get) {
        // this.startTimer();
        state.showCurrencyExchange = true;
        state.currenciesHideSell = false;
        state.currenciesHideBuy = false;
        state.blockHide = false;
        state.detailsHide = true;
      } else if (Give === false) {
        state.sell_currency_id = null;
      } else if (Get === false) {
        state.buy_currency_id = null;
      }
    },
    sellHideBlock() {
      this.commit("hideBlocks");
    },
    buyHideBlock() {
      this.commit("hideBlocks");
    },
    deleteAllHistory() {
      history.pushState(false, document.title, "/");
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", "");
    },
  }, //Функция для изменения state
  actions: {
    calculateForm({ state, commit, getters }, arr) {
      document
        .querySelectorAll(".form-exchange .field-error")
        .forEach(function (el, i) {
          el.innerHTML = "";
        });
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      axios
        .post(
          "http://proxy.local/" + getters.getLang + "/json/calculate",
          qs.stringify({
            sell_currency_id: state.sell_currency_id,
            buy_currency_id: state.buy_currency_id,
            sell_amount: state.sell_amount,
            buy_amount: state.buy_amount,
            is_verified: state.is_verified,
            type: arr[0],
            city_id: state.city_id,
            lang: getters.getLanguage,
            refresh: arr[1],
          }),
          config
        )
        .then(function (response) {
          commit("setCalculateForm", response, arr[1]);
        });
    },
    fetchGroupsAndCurrencies({ commit, getters }) {
      return axios
        .get(
          "http://proxy.local/" +
            getters.getLang +
            "/json/get-groups-and-currencies"
        )
        .then(function (response) {
          commit("setGroupsAndCurrencies", response);
        });
    },
    fetchBuyCurrencies({ commit, getters, state }) {
      axios
        .get(
          "http://proxy.local/" + getters.getLang + "/json/get-buy-currencies",
          {
            params: {
              sell_currency_id: state.sell_currency_id,
            },
          }
        )
        .then(function (response) {
          commit("setBuyCurrencies", response);
        });
    },
    fetchSellCurrencies({ commit, getters, state }) {
      axios
        .get(
          "http://proxy.local/" + getters.getLang + "/json/get-sell-currencies",
          {
            params: {
              buy_currency_id: state.buy_currency_id,
            },
          }
        )
        .then(function (response) {
          commit("setSellCurrencies", response);
        });
    },
    fetchGroupsAndCurrenciesFromPage({ commit }) {
      let data = document.getElementById("preloadGroupsAndCurrencies");
      if (!data) {
        this.dispatch("fetchGroupsAndCurrencies");
        return true;
      }
      let json = JSON.parse(data.innerHTML);
      commit("setGroupsAndCurrenciesFromPage", json);
    },
  }, //Функции асинхронные
  getters: {
    getType(state) {
      if (state.type !== "default" && state.type !== "revert") {
        return "default";
      }
      return state.type;
    },
    getLanguage() {
      return document.getElementById("language").value;
    },
    getLang(getters) {
      if (getters.getLanguage === "en") {
        return "en";
      } else if (getters.getLanguage === "ua") {
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
    buyCurrencyId(state) {
      return state.buy_currency_id;
    },
    sellCurrencyId(state) {
      return state.sell_currency_id;
    },
    colorSpectrum(state) {
      return state.theme;
    },
    courseText(state) {
      return state.calculateData;
    },
    course(state) {
      return state.course;
    },
  }, // Получения state
});
export default store;
