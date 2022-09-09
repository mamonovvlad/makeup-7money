import { createStore } from "vuex";
import axios from "axios";
import qs from "querystring-es3";

const store = createStore({
  state: {
    proxy: process.env.PROXY,
    proxy2: process.env.PROXY2,
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
    rateReserves: {},
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
    of_exchange: 0,
    city_id: null,
    // calculate data
    course: {},
    sellCurrency: {},
    buyCurrency: {},
    calculateData: {},
    type: "default",
    //hide blocks
    detailsHide: false,
    currenciesHideSell: true,
    currenciesHideBuy: true,
    blockHide: true,
    //timer
    currentTime: 60,
    timer: null,
  }, //Хранения данных
  mutations: {
    setOfExchange(state, e) {
      state.of_exchange = !!e.target.checked;
    },
    setIsVerified(state, e) {
      state.is_verified = !!e.target.checked;
      this.dispatch("calculateForm", ["revert"]);
    },
    updateSellAmount(state, val) {
      state.type = "default";
      if (
        state.sell_amount.length <= 0 ||
        state.sell_amount === 0 ||
        state.sell_amount === ""
      ) {
        return;
      }
      let float = state.sell_amount;
      if (typeof state.sell_amount === "string") {
        float = parseFloat(String(state.sell_amount).replace(/,/g, "."));
        if (float <= 0) {
          float = 0;
        }
      }
      state.sell_amount = float;
      if (state.sell_amount > 0) {
        this.dispatch("calculateForm", ["default"]);
      }
    },
    updateBuyAmount(state, val) {
      state.type = "revert";
      if (
        state.buy_amount.length <= 0 ||
        state.buy_amount === 0 ||
        state.buy_amount === ""
      ) {
        return;
      }

      let float = parseFloat(String(state.buy_amount).replace(/,/g, "."));
      if (float <= 0) {
        float = 0;
        state.buy_amount = float;
      }

      if (state.buy_amount > 0) {
        this.dispatch("calculateForm", ["revert"]);
      }
    },
    startTimer(state) {
      clearTimeout(state.timer);
      state.timer = setInterval(() => {
        state.currentTime--;
      }, 1000);
    },
    stopTimer(state) {
      clearTimeout(state.timer);
      state.currentTime = 60;
    },
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
      this.commit("stopTimer");
      state[payload[0] + "CurrencyGroup"] = state.currencyGroups[payload[1]];
      state[payload[0] + "CurrencyGroupId"] =
        state.currencyGroups[payload[1]].id;
    },
    setResetCurrencyGroup(state, payload) {
      this.commit("stopTimer");
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
    setActiveCurrency(
      state,
      [type, id, isCalculate = true, isTrash = true, isSetUrl = true]
    ) {
      // if (type === "sell" && isTrash) {
      //   this.commit("trashClick");
      // }
      if (window.innerWidth <= 768) {
        state.detailsHide = false;
        state.currenciesHideSell = true;
        state.currenciesHideBuy = false;
      }
      this.commit("stopTimer");
      state[type + "_currency_id"] = id;
      this.commit(`${type}HideBlock`);
      this.commit(`${type}HideBlock`);

      if (state.sell_currency_id === null && state.buy_currency_id !== null) {
        this.dispatch("fetchSellCurrencies");
      }
      if (state.sell_currency_id !== null && state.buy_currency_id === null) {
        this.dispatch("fetchBuyCurrencies");
      }
      if (
        isCalculate &&
        state.sell_currency_id !== null &&
        state.buy_currency_id !== null
      ) {
        this.dispatch("calculateForm", [store.getters.getType, true]);
        if (isSetUrl) {
          setTimeout(() => {
            this.commit("setGetUrl");
          }, 1000);
        }
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
      state.detailsHide = false;
      state.currenciesHideSell = true;
      state.currenciesHideBuy = true;
      state.blockHide = true;
      this.commit("stopTimer");
      state.sell_currency_id = null;
      state.buy_currency_id = null;
      this.commit("deleteAllHistory");
      if (window.innerWidth < 768) {
        state.detailsHide = false;
        state.currenciesHideSell = true;
        state.currenciesHideBuy = false;
        state.blockHide = true;
        this.commit("stopTimer");
      }
    },
    hideBlocks(state) {
      let Give = state.sell_currency_id !== null;
      let Get = state.buy_currency_id !== null;
      if (Give && Get) {
        this.commit("startTimer");
        state.blockHide = false;
        state.currenciesHideSell = false;
        state.currenciesHideBuy = false;
        state.detailsHide = true;
      } else if (Give === false) {
        state.sell_currency_id = null;
      } else if (Get === false) {
        state.buy_currency_id = null;
      }
    },
    sellHideBlock(state) {
      this.dispatch("fetchRateReserves", state.sell_currency_id);
      this.commit("hideBlocks");
      if (
        window.innerWidth <= 768 &&
        state.sell_currency_id !== null &&
        state.buy_currency_id === null
      ) {
        state.currenciesHideSell = false;
        state.currenciesHideBuy = true;
      }
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
    setGetUrl(state) {
      let url = "";
      if (store.getters.getLanguage !== "ru") {
        url += "/" + store.getters.getLanguage;
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
    setRateReserves(state, res) {
      state.rateReserves = res.data;
    },
  }, //Функция для изменения state
  actions: {
    calculateForm(
      { state, commit, getters },
      [type = "default", refresh = false]
    ) {
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
          state.proxy + getters.getLang + "/json/calculate",
          qs.stringify({
            sell_currency_id: state.sell_currency_id,
            buy_currency_id: state.buy_currency_id,
            sell_amount: state.sell_amount,
            buy_amount: state.buy_amount,
            is_verified: state.is_verified,
            type: type,
            city_id: state.city_id,
            lang: getters.getLanguage,
            refresh: refresh,
          }),
          config
        )
        .then(function (response) {
          commit("setCalculateForm", response, refresh);
        });
    },
    fetchGroupsAndCurrencies({ state, commit, getters }) {
      return axios
        .get(state.proxy + getters.getLang + "/json/get-groups-and-currencies")
        .then(function (response) {
          commit("setGroupsAndCurrencies", response);
        });
    },
    fetchBuyCurrencies({ commit, getters, state }) {
      axios
        .get(state.proxy + getters.getLang + "/json/get-buy-currencies", {
          params: {
            sell_currency_id: state.sell_currency_id,
          },
        })
        .then(function (response) {
          commit("setBuyCurrencies", response);
        });
    },
    fetchSellCurrencies({ commit, getters, state }) {
      axios
        .get(state.proxy + getters.getLang + "/json/get-sell-currencies", {
          params: {
            buy_currency_id: state.buy_currency_id,
          },
        })
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
    fetchRateReserves({ commit, state }, id) {
      axios
        .get(
          `${state.proxy2}/v1/course/rate-reserves?sell_currency_id=${id}&access-token=EFjko3OineBf8RQCth33wpC0dZqM4CyO&_format=json`
        )
        .then((res) => {
          commit("setRateReserves", res);
        });
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
    getLang() {
      if (store.getters.getLanguage === "en") {
        return "/en";
      } else if (store.getters.getLanguage === "ua") {
        return "/ua";
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
    getRateReserves(state) {
      return state.rateReserves;
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
    sellCurrency(state) {
      return state.sellCurrency;
    },
    buyCurrency(state) {
      return state.buyCurrency;
    },
    colorSpectrum(state) {
      return state.theme;
    },
    calculateData(state) {
      return state.calculateData;
    },
    course(state) {
      return state.course;
    },
    currentTime(state) {
      return state.currentTime;
    },
    currenciesHideSell(state) {
      return state.currenciesHideSell;
    },
    currenciesHideBuy(state) {
      return state.currenciesHideBuy;
    },
    detailsHide(state) {
      return state.detailsHide;
    },
    blockHide(state) {
      return state.blockHide;
    },
    sellAmount(state) {
      return state.sell_amount;
    },
  }, // Получения state
});
export default store;
