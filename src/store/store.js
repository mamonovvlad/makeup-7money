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
    sell_currency_id: null,
    buy_currency_id: null,
    sell_amount: 0,
    buy_amount: 0,
    sell_percent: 0,
    buy_percent: 0,
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
    //
    isShowWindow: false,
  }, //Хранения данных
  mutations: {
    hideLines() {
      let itemsWrapper = document.querySelectorAll(".items__wrapper");
      if (itemsWrapper) {
        itemsWrapper.forEach((item) => {
          if (item.lastElementChild === null) {
            item.classList.add("d-none");
          }
        });
      }
    },
    inputCurrencyId(state) {
      let inputHiddenLastSellId = document.getElementById(
        "inputHiddenLastSellId"
      );
      let inputHiddenLastBuyId = document.getElementById(
        "inputHiddenLastBuyId"
      );
      if (inputHiddenLastSellId && inputHiddenLastBuyId) {
        inputHiddenLastSellId.value = state.sell_currency_id;
        inputHiddenLastBuyId.value = state.buy_currency_id;
      }
    },
    clearError() {
      let helpBlock = document.querySelectorAll(".help-block");
      let field = document.querySelectorAll(".field .form-group");
      field.forEach(function (el) {
        if (el.classList.contains("has-error")) {
          el.classList.remove("has-error");
        }
      });
      helpBlock.forEach(function (el) {
        el.innerHTML = "";
      });
    },
    captcha() {
      let captcha = "6LcIdggUAAAAABRu2Ize9tt04x7hhkHh2KLRgoAf";
      let language = document.getElementById("language");
      let gRecaptcha = document.querySelectorAll(".g-recaptcha");
      if (gRecaptcha) {
        if (language.value === "ru") {
          document
            .querySelector(".g-recaptcha")
            .setAttribute("data-lang", "ru");
        } else {
          document
            .querySelector(".g-recaptcha")
            .setAttribute("data-lang", "en");
        }
        gRecaptcha.forEach((item) => {
          item.setAttribute("data-sitekey", captcha);
        });
      }
    },
    copyText(state, event) {
      try {
        navigator.clipboard.writeText(event.target.dataset.copy);
        event.target.querySelector(".copied").classList.remove("d-none");
        setTimeout(() => {
          event.target.querySelector(".copied").classList.add("d-none");
        }, 1500);
      } catch (e) {
        throw e;
      }
    },
    showRecoveryInformation() {
      let itemsWrapper = document.querySelectorAll(".items__wrapper .item");
      itemsWrapper.forEach((wrapper) => {
        let windows = wrapper.querySelectorAll(".recovery-information");
        let inputs = wrapper.querySelectorAll("input");
        if (windows.length > 0) {
          inputs.forEach((item) => {
            item.addEventListener("focus", () => {
              item.parentElement.parentElement.parentElement
                .querySelector(".recovery-information")
                .classList.remove("d-none");
            });
            item.addEventListener("blur", () => {
              item.parentElement.parentElement.parentElement
                .querySelector(".recovery-information")
                .classList.add("d-none");
            });
          });
        }
      });
    },
    calculationFormSellAmountCommission() {
      this.dispatch("calculateForm", ["default"]);
    },
    calculationFormBuyAmountCommission() {
      this.dispatch("calculateForm", ["default"]);
    },
    calculationAmountCommission(state, val) {
      if (val === "sell") {
        let sell_commission = Number(state.sell_amount_with_commission);
        let sell_percent = Number(state.sell_percent);
        let res =
          sell_commission -
          (sell_commission * sell_percent) / (100 + sell_percent);
        state.sell_amount = res.toFixed(2);
      } else if (val === "buy") {
        let buy_commission = Number(state.buy_amount_with_commission);
        let buy_percent = Number(state.buy_percent);
        let res =
          buy_commission + (buy_commission * buy_percent) / (100 + buy_percent);
        state.buy_amount = res.toFixed(2);
      }
    },
    calculationAmount(state, val) {
      if (Number(state.course.sell) !== 1) {
        if (val === "sell") {
          let res = state.sell_amount / state.course.sell;
          state.buy_amount = +res.toFixed(7);
          //+
        } else if (val === "buy") {
          let res = state.buy_amount * state.course.sell;
          state.sell_amount = +res.toFixed(7);
        }
      } else {
        console.log("2");
        if (val === "sell") {
          let res = state.sell_amount * state.course.buy;
          state.buy_amount = +res.toFixed(7);
        } else if (val === "buy") {
          let res = state.buy_amount / state.course.buy;
          state.sell_amount = +res.toFixed(7);
        }
      }
    },
    setOfExchange(state, e) {
      state.of_exchange = e.target.checked ? 1 : 0;
    },
    setIsVerified(state, e) {
      state.is_verified = e.target.checked ? 1 : 0;
      this.dispatch("calculateForm", ["revert"]);
    },
    updateSellAmount(state) {
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
        float = parseFloat(state.sell_amount.replace(/,/g, "."));
        if (float <= 0) {
          float = 0;
        }
      }
      state.sell_amount = float;
      if (state.sell_amount > 0) {
        this.dispatch("calculateForm", ["default"]);
      }
    },
    updateBuyAmount(state) {
      state.type = "revert";
      if (
        state.buy_amount.length <= 0 ||
        state.buy_amount === 0 ||
        state.buy_amount === ""
      ) {
        return;
      }
      let float = state.buy_amount;
      if (typeof state.buy_amount === "string") {
        let float = parseFloat(state.buy_amount.replace(/,/g, "."));
        if (float <= 0) {
          float = 0;
        }
      }
      state.buy_amount = float;
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
      state.sell_percent = response.data.sell_percent;
      state.buy_percent = response.data.buy_percent;
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
      if (refresh) {
        state.sell_source = response.data.sell_source;
      }
      if (refresh) {
        state.buy_target = response.data.buy_target;
      }
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
    checkLastCurrencies(state) {
      let inputHiddenLastSellId = document.getElementById(
        "inputHiddenLastSellId"
      );
      let inputHiddenLastBuyId = document.getElementById(
        "inputHiddenLastBuyId"
      );

      if (inputHiddenLastSellId && inputHiddenLastBuyId) {
        if (inputHiddenLastSellId.value > 0 && window.innerWidth >= 768) {
          this.commit("setActiveCurrency", [
            "sell",
            parseInt(inputHiddenLastSellId.value),
            true,
            false,
            false,
          ]);
        } else if (window.innerWidth <= 768) {
          state.currenciesHideSell = true;
        }

        if (inputHiddenLastBuyId.value > 0 && window.innerWidth >= 768) {
          this.commit("setActiveCurrency", [
            "buy",
            parseInt(inputHiddenLastBuyId.value),
            true,
            false,
            false,
          ]);
        } else if (window.innerWidth <= 768) {
          state.currenciesHideBuy = false;
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
      let params = new global.URLSearchParams(uri);
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
      let params = new global.URLSearchParams(uri);
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
      this.commit("stopTimer", "state");
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
      if (
        state.calculateData !== "undefined" &&
        state.calculateData.length === 0
      ) {
        history.pushState(false, document.title, url);
      } else if (state.sellCurrency.code !== "undefined") {
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
      commit("inputCurrencyId");
      commit("clearError");
      commit("hideLines");

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
          commit("showRecoveryInformation");
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
    proxy(state) {
      return state.proxy;
    },
  }, // Получения state
});
export default store;
