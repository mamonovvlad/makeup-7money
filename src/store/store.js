import { createStore } from "vuex";
import axios from "axios";
import qs from "querystring-es3";
import { CurrencyModel } from "../assets/js/currency-model.js";
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
    sell_amount_with_discount: 0,
    buy_amount_with_discount: 0,
    sell_source: "",
    buy_target: "",
    is_verified: 0,
    of_exchange: 0,
    city_id: null,
    // calculate data
    course: {},
    countries: {},
    availableCities: {},
    fixedCourse: {},
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
    ////////
    sellNumbers: 2,
    buyNumbers: 2,
    //Time
    time: new Date(),
    interval: null,
    //Custom select
    borderActive: false,
    isWarningForm: true,
    //select
    countriesId: null,
    sortCountries: [],
    sortCities: [],
  }, //Хранения данных
  mutations: {
    viewPassword(state, idx) {
      let pas = document.querySelectorAll(".password");
      pas.forEach((item) => {
        if (item.getAttribute("data-idx") === String(idx)) {
          let inp = item.querySelector("input");
          if (inp.getAttribute("type") === "password") {
            inp.setAttribute("type", "text");
          } else {
            inp.setAttribute("type", "password");
          }
        }
      });
    },
    confirmChecked() {
      let checkBox = document.getElementById("orderform-agree");
      if (checkBox && checkBox.checked === true) {
        this.commit("enabled");
      } else {
        this.commit("disabled");
      }
    },
    scrollToError() {
      const checkBox = document.getElementById("orderform-agree");
      if (checkBox && checkBox.checked === true) {
        let hasErrors = document.querySelectorAll(".has-error");
        if (hasErrors.length !== 0) {
          hasErrors.forEach((error) => {
            error.scrollIntoView({
              behavior: "smooth",
            });
          });
        } else {
          document.addEventListener("submit", () => {
            this.commit("disabled");
          });
        }
      } else {
        document
          .querySelector(".form-exchange .animation-border .border")
          .classList.add("border--disabled");
      }
    },

    enabled(state) {
      let button = document.getElementById("order-submit");
      button.setAttribute("type", "submit");
      button.classList.remove("disabled");
      state.borderActive = false;
    },
    disabled(state) {
      let button = document.getElementById("order-submit");
      let checkBox = document.getElementById("orderform-agree");
      checkBox.checked = false;
      button.setAttribute("type", "button");
      button.classList.add("disabled");
      state.borderActive = true;
    },
    calculate(state, type) {
      if (state.sell_currency_id === state.buy_currency_id) {
        return false;
      }

      if (!state.fixedCourse) {
        return false;
      }

      if (state.sell_currency_id === 1) {
        state.sell_source = state.sell_source.toUpperCase();
      }

      if (
        state.sell_currency_id &&
        state.buy_currency_id &&
        state.fixedCourse
      ) {
        if (type === "default") {
          this.commit("calculateDefault");
        }

        if (type === "revert") {
          this.commit("calculateRevert");
        }
      }

      return false;
    },
    ////////////////////////////////////////
    calculationAmountCommission(state, val) {
      this.commit("currencyModelIsCrypt");
      if (val === "sell") {
        let sell_commission = Number(
          state.calculateData.sell_amount_with_comission
        );
        let sell_percent = Number(state.calculateData.sell_percent);
        let res =
          sell_commission -
          (sell_commission * sell_percent) / (100 + sell_percent);
        state.sell_amount = res.toFixed(state.sellNumbers);
      } else if (val === "buy") {
        let buy_commission = Number(
          state.calculateData.buy_amount_with_comission
        );
        let buy_percent = Number(state.calculateData.buy_percent);
        let res =
          buy_commission + (buy_commission * buy_percent) / (100 + buy_percent);
        state.buy_amount = res.toFixed(state.buyNumbers);
      }
    },
    currencyModelIsCrypt(state) {
      if (CurrencyModel.isCrypt(state.sell_currency_id) === true) {
        state.sellNumbers = 7;
      } else {
        state.sellNumbers = 2;
      }
      if (CurrencyModel.isCrypt(state.buy_currency_id) === true) {
        state.buyNumbers = 7;
      } else {
        state.buyNumbers = 2;
      }
    },
    checkVerified(state) {
      if (
        state.sellCurrency.is_sell_verified === 1 &&
        state.is_verified === 1
      ) {
        for (let item of state.allCurrencies) {
          switch (state.sell_currency_id) {
            case Number(item.id):
              state.sellCurrency.sell_comission = item.sell_verified_comission;
              break;
          }
        }
      }
      if (state.buyCurrency.is_buy_verified === 1 && state.is_verified === 1) {
        for (let item of state.allCurrencies) {
          switch (state.buy_currency_id) {
            case Number(item.id):
              state.buyCurrency.buy_comission = item.buy_verified_comission;
              break;
          }
        }
      }
    },
    operatorCalculation(state, type) {
      let buyAmount;
      let sellAmount;
      let operatorCalculationSell = spaceship(
        Number(state.fixedCourse.sell),
        1
      );
      let operatorCalculationBuy = spaceship(Number(state.fixedCourse.buy), 1);

      if (type === "sell") {
        if (operatorCalculationSell === 0 && operatorCalculationBuy === 0) {
          state.buy_amount = state.sell_amount;
        } else if (operatorCalculationSell === 0) {
          buyAmount = +(
            parseFloat(state.sell_amount) * parseFloat(state.fixedCourse.buy)
          ).toFixed(state.buyNumbers);
          if (buyAmount <= 0) {
            buyAmount =
              parseFloat(state.sell_amount) * parseFloat(state.fixedCourse.buy);
          }
          state.buy_amount = isNaN(buyAmount) === true ? "" : buyAmount;
        } else if (operatorCalculationBuy === 0) {
          buyAmount = 0;
          if (state.fixedCourse.sell !== 0) {
            buyAmount = +(
              parseFloat(state.sell_amount) / parseFloat(state.fixedCourse.sell)
            ).toFixed(state.buyNumbers);
          }
          if (buyAmount === 0 && state.fixedCourse.sell !== 0) {
            buyAmount =
              parseFloat(state.sell_amount) /
              parseFloat(state.fixedCourse.sell);
          }
          state.buy_amount = isNaN(buyAmount) === true ? "" : buyAmount;
        }
      } else if (type === "buy") {
        if (operatorCalculationSell === 0 && operatorCalculationBuy === 0) {
          state.sell_amount = state.buy_amount;
        } else if (operatorCalculationSell === 0) {
          sellAmount = +(
            parseFloat(state.buy_amount) / parseFloat(state.fixedCourse.buy)
          ).toFixed(state.sellNumbers);
          state.sell_amount = isNaN(sellAmount) === true ? "" : sellAmount;
        } else if (operatorCalculationBuy === 0) {
          sellAmount = +(
            parseFloat(state.fixedCourse.sell) * parseFloat(state.buy_amount)
          ).toFixed(state.sellNumbers);
          state.sell_amount = isNaN(sellAmount) === true ? "" : sellAmount;
        }
      }

      function spaceship(val1, val2) {
        if (val1 === null || val2 === null || typeof val1 !== typeof val2) {
          return null;
        }
        if (typeof val1 === "string") {
          return val1.localeCompare(val2);
        } else {
          if (val1 > val2) {
            return 1;
          } else if (val1 < val2) {
            return -1;
          }
          return 0;
        }
      }
    },
    calculateCommission(state, type) {
      state.calculateData.sell_amount_with_comission =
        state.calculateData.sell_amount_with_discount ?? state.sell_amount;
      state.calculateData.buy_amount_with_comission =
        state.calculateData.buy_amount_with_discount ?? state.buy_amount;
      let buyCommission;
      let sellCommission;

      if (state.sellCurrency.sell_comission) {
        let sellAmountComission = parseCommission(
          state.sell_amount,
          state.sellCurrency.sell_comission,
          state.sellNumbers
        );
        sellAmountComission = parseFloat(sellAmountComission);

        if (
          state.sellCurrency.sell_max_comission > 0 &&
          sellAmountComission > state.sellCurrency.sell_max_comission
        ) {
          sellAmountComission = state.sellCurrency.sell_max_comission;
        }
        state.calculateData.sell_amount_comission = sellAmountComission;

        if (state.calculateData.sell_amount_with_discount > 0) {
          let sellDiscountComission = parseCommission(
            state.calculateData.sell_amount_with_discount,
            state.sellCurrency.sell_comission,
            state.sellNumbers
          );
          sellDiscountComission = parseFloat(sellDiscountComission);

          if (
            state.sellCurrency.sell_max_comission > 0 &&
            sellDiscountComission > state.sellCurrency.sell_max_comission
          ) {
            sellCommission = +(
              parseFloat(state.calculateData.sell_amount_with_discount) +
              parseFloat(state.sellCurrency.sell_max_comission)
            ).toFixed(state.sellNumbers);
            state.calculateData.sell_amount_with_comission =
              isNaN(sellCommission) === true ? "" : sellCommission;
          } else if (CurrencyModel.isUahBank(state.sell_currency_id) === true) {
            sellCommission = +(
              parseFloat(state.calculateData.sell_amount_with_discount) -
              sellDiscountComission
            ).toFixed(state.sellNumbers);
            state.calculateData.sell_amount_with_comission =
              isNaN(sellCommission) === true ? "" : sellCommission;
          } else {
            sellCommission = +(
              parseFloat(state.calculateData.sell_amount_with_discount) +
              sellDiscountComission
            ).toFixed(state.sellNumbers);
            state.calculateData.sell_amount_with_comission =
              isNaN(sellCommission) === true ? "" : sellCommission;
          }
        } else {
          if (
            state.sellCurrency.sell_max_comission > 0 &&
            sellAmountComission > state.sellCurrency.sell_max_comission
          ) {
            sellCommission = +(
              parseFloat(state.sell_amount) +
              parseFloat(state.sellCurrency.sell_max_comission)
            ).toFixed(state.sellNumbers);
            state.calculateData.sell_amount_with_comission =
              isNaN(sellCommission) === true ? "" : sellCommission;
          } else if (CurrencyModel.isUahBank(state.sell_currency_id) === true) {
            sellCommission = +(
              parseFloat(state.sell_amount) - sellAmountComission
            ).toFixed(state.sellNumbers);
            state.calculateData.sell_amount_with_comission =
              isNaN(sellCommission) === true ? "" : sellCommission;
          } else {
            if (state.sellCurrency.sell_comission > 0) {
              sellCommission = +(
                parseFloat(state.sell_amount) + sellAmountComission
              ).toFixed(state.sellNumbers);
              state.calculateData.sell_amount_with_comission =
                isNaN(sellCommission) === true ? "" : sellCommission;
            } else {
              sellCommission = +(
                parseFloat(state.sell_amount) - sellAmountComission
              ).toFixed(state.sellNumbers);
              state.calculateData.sell_amount_with_comission =
                isNaN(sellCommission) === true ? "" : sellCommission;
            }
          }
        }
      }

      if (state.buyCurrency.buy_comission) {
        let buyAmountComission = parseCommission(
          state.buy_amount,
          state.buyCurrency.buy_comission,
          state.buyNumbers
        );
        buyAmountComission = parseFloat(buyAmountComission);

        if (
          state.buyCurrency.buy_max_comission > 0 &&
          buyAmountComission > state.buyCurrency.buy_max_comission
        ) {
          buyAmountComission = state.buyCurrency.buy_max_comission;
        }
        state.calculateData.buy_amount_comission = buyAmountComission;
        if (type === "sell") {
          if (state.buyCurrency.buy_comission > 0) {
            buyCommission = +(
              parseFloat(state.buy_amount) + buyAmountComission
            ).toFixed(state.buyNumbers);
            state.calculateData.buy_amount_with_comission =
              isNaN(buyCommission) === true ? "" : buyCommission;
          } else {
            buyCommission = +(
              parseFloat(state.buy_amount) - buyAmountComission
            ).toFixed(state.buyNumbers);
            state.calculateData.buy_amount_with_comission =
              isNaN(buyCommission) === true ? "" : buyCommission;
          }
        }
      }

      function parseCommission(amount, percent, numbers) {
        amount = parseFloat(amount);
        percent = parseFloat(percent);
        numbers = parseFloat(numbers);

        if (percent > 0) {
          return ((amount * percent) / 100).toFixed(numbers);
        }

        if (percent < 0) {
          for (let id of CurrencyModel.UAH_BANK_IDS) {
            if (state.sellCurrency.id === id || state.sellCurrency.id === id) {
              let calcAmount = amount;
              calcAmount -= 5;
              return (
                amount -
                ((calcAmount * 100) / (100 + Math.abs(percent))).toFixed(
                  numbers
                )
              );
            }
          }
          return (
            amount -
            ((amount * 100) / (100 + Math.abs(percent))).toFixed(numbers)
          );
        }
        return 0;
      }
    },
    ////////////////////////////////////////
    calculateDefault() {
      this.commit("currencyModelIsCrypt");
      this.commit("checkVerified");
      //Calculation Default
      this.commit("operatorCalculation", "sell");
      //Commission
      this.commit("calculateCommission", "sell");
    },
    calculateRevert() {
      this.commit("currencyModelIsCrypt");
      this.commit("checkVerified");
      //Calculation Default
      this.commit("operatorCalculation", "buy");
      //Commission
      this.commit("calculateCommission", "buy");
    },
    ////////////////////////////////////////
    updateSellAmount(state, city = null) {
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
    inputCurrencyId(state) {
      let inputHiddenLastSellId = document.querySelectorAll(
        ".inp-sell_currency_id"
      );
      let inputHiddenLastBuyId = document.querySelectorAll(
        ".inp-buy_currency_id"
      );
      if (inputHiddenLastSellId && inputHiddenLastBuyId) {
        inputHiddenLastSellId.forEach((el) => {
          el.value = state.sell_currency_id;
        });
        inputHiddenLastBuyId.forEach((el) => {
          el.value = state.buy_currency_id;
        });
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
      let gRecaptchas = document.querySelectorAll(".g-recaptcha");
      let gRecaptcha = document.querySelector(".g-recaptcha");
      if (gRecaptcha && language) {
        if (language.value === "ru") {
          gRecaptcha.setAttribute("data-lang", "ru");
        } else {
          gRecaptcha.setAttribute("data-lang", "en");
        }
        gRecaptchas.forEach((item) => {
          item.setAttribute("data-sitekey", captcha);
        });
      }
    },
    /////
    filterCity(state) {
      state.sortCities = [];
      let name;
      let cities = Object.entries(state.availableCities).filter(
        (item) => +item[1].country_id === +state.countriesId
      );
      for (let item of cities) {
        if (store.getters.getLanguage === "en") {
          name = item[1].name_en;
        } else if (store.getters.getLanguage === "ua") {
          name = item[1].name_ua;
        } else {
          name = item[1].name_ru;
        }
        state.sortCities.push({
          id: item[1].id,
          value: name,
        });
      }
      state.sortCities = state.sortCities.sort((a, b) =>
        a.value.localeCompare(b.value)
      );
    },
    filterCountries(state) {
      let name;
      state.sortCountries = [];
      Object.entries(state.countries).forEach((item) => {
        Object.entries(state.availableCities).forEach((city, index) => {
          if (+city[1].country_id === +item[1].id) {
            if (store.getters.getLanguage === "en") {
              name = item[1].name_en;
            } else if (store.getters.getLanguage === "ua") {
              name = item[1].name_ua;
            } else {
              name = item[1].name_ru;
            }
            state.sortCountries.push({
              id: item[1].id,
              value: name,
            });
          }
        });
      });

      const ids = state.sortCountries.map(({ id }) => id);
      state.sortCountries = state.sortCountries.filter(
        ({ id }, index) => !ids.includes(id, index + 1)
      );
      state.sortCountries = state.sortCountries.sort((a, b) =>
        a.value.localeCompare(b.value)
      );
    },
    setCityId(state, e) {
      let opt;
      let target = e.target;
      for (let i = 0, len = target.options.length; i < len; i++) {
        opt = target.options[i];
        if (opt.selected === true) {
          break;
        }
      }
      state.city_id = parseInt(opt.value);
      state.currentTime = 60;
      this.dispatch("calculateForm", [store.getters.getType]);
    },
    setCountriesId(state, e) {
      let opt;
      let target = e.target;
      for (let i = 0; i < target.options.length; i++) {
        opt = target.options[i];
        if (opt.selected === true) {
          break;
        }
      }
      state.countriesId = +parseInt(opt.value);
      this.commit("filterCity");
    },
    /////
    showRecoveryInformation() {
      let itemsWrapper = document.querySelectorAll(".items__wrapper .item");
      itemsWrapper.forEach((wrapper) => {
        let windows = wrapper.querySelectorAll(".recovery-information");
        let inputs = wrapper.querySelectorAll("input");
        if (windows.length > 0) {
          inputs.forEach((item) => {
            let information =
              item.parentElement.parentElement.parentElement.querySelectorAll(
                ".recovery-information"
              );
            item.addEventListener("focus", () => {
              information.forEach((info) => {
                info.classList.remove("d-none");
              });
            });
            item.addEventListener("blur", () => {
              item.addEventListener("focus", () => {
                information.forEach((info) => {
                  info.classList.add("d-none");
                });
              });
            });
          });
        }
      });
    },
    updateTime(state) {
      state.interval = setInterval(() => {
        state.time = new Date();
      }, 1000);
    },
    setOfExchange(state, e) {
      state.of_exchange = e.target.checked ? 1 : 0;
    },
    setIsVerified(state, e) {
      state.is_verified = e.target.checked ? 1 : 0;
      this.dispatch("calculateForm", ["revert"]);
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
    calculateDiscount(state, res) {
      state.sell_amount_with_discount = res.data.sell_amount_with_discount;
      state.buy_amount_with_discount = res.data.buy_amount_with_discount;
    },
    setCalculateForm(state, [response, refreshValue]) {
      state.availableCities = response.data.availableCities;
      state.countries = response.data.countries;
      state.isWarningForm =
        +response.data.max_buy_amount > +response.data.min_buy_amount;
      state.sell_percent = response.data.sell_percent;
      state.buy_percent = response.data.buy_percent;
      state.sellCurrencies = response.data.sellCurrencies;
      state.sell_currency_id = response.data.sell_currency_id;
      state.buyCurrencies = response.data.buyCurrencies;
      state.buy_currency_id = response.data.buy_currency_id;
      state.buy_currency_id = response.data.buy_currency_id;
      state.sellCurrency = response.data.sellCurrency;
      state.buyCurrency = response.data.buyCurrency;
      state.course = response.data.course;
      state.fixedCourse = response.data.fixed_course;
      state.calculateData = response.data;
      state.sell_amount = response.data.sell_amount;
      state.sell_amount_with_commission =
        response.data.sell_amount_with_comission;
      state.buy_amount = response.data.buy_amount;
      state.buy_amount_with_commission =
        response.data.buy_amount_with_comission;
      if (refreshValue) {
        state.sell_source = response.data.sell_source;
        state.buy_target = response.data.buy_target;
      }
      this.commit("setDocumentTitle");
      //login
      let uid = document.getElementById("uid").value;
      if (document.getElementById("login").value === "1") {
        this.dispatch("fetchCalculateDiscount", uid);
      }
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
        if (inputHiddenLastSellId.value > 0 && window.innerWidth >= 768) {
          this.commit("setActiveCurrency", [
            "sell",
            parseInt(inputHiddenLastSellId.value),
            true,
            false,
            false,
          ]);
        }

        if (inputHiddenLastBuyId.value > 0 && window.innerWidth >= 768) {
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
      // };

      this.commit("disabled");
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
      // if (
      //   +state.sell_currency_id === +state.buy_currency_id &&
      //   +state.buy_currency_id === +state.buy_currency_id
      // ) {
      //   this.commit("trashClick");
      // }
      if (
        isCalculate &&
        state.sell_currency_id !== null &&
        state.buy_currency_id !== null
      ) {
        this.dispatch("calculateForm", [store.getters.getType, true, true]);
        this.commit("inputCurrencyId");
        if (isSetUrl) {
          setTimeout(() => {
            this.commit("setGetUrl");
          }, 1000);
        }
      }
    },
    setRefresh(state) {
      this.commit("clearError");
      this.commit("disabled");
      if (!state.calculateData || state.calculateData.isBackExchange !== 1) {
        return false;
      }
      let tempId = state.buy_currency_id;
      state.buy_currency_id = state.sell_currency_id;
      state.sell_currency_id = tempId;
      this.commit("inputCurrencyId");
      if (state.sell_currency_id !== null && state.buy_currency_id !== null) {
        this.dispatch("calculateForm", [store.getters.getType, true, true]);
      }
    },
    callbackTimerFinish() {
      this.dispatch("calculateForm", ["default", true]);
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
      if (window.innerWidth <= 768) {
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
        state.calculateData !== undefined &&
        state.calculateData.length === 0
      ) {
        history.pushState(false, document.title, url);
      } else if (state.sellCurrency !== undefined) {
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
    clearInput() {
      let autofill = document.querySelectorAll(".autofill");
      autofill.forEach((inp) => {
        inp.value = "";
      });
    },
    characterCountCheck(state) {
      let inputs = document.querySelectorAll(".field .form-group input");
      if (inputs) {
        inputs.forEach((input) => {
          input.addEventListener("mouseover", () => {
            if (input.value.length >= 20) {
              input.insertAdjacentHTML(
                "afterend",
                `<span class="tippy" ></span>`
              );
              input.parentNode.querySelector(".tippy").innerText = input.value;
              input.parentNode.querySelector(".tippy").style.cssText = `
                top: -24px;
                opacity: 1;
                z-index: 1;`;
            }
          });
          input.addEventListener("mouseout", () => {
            if (
              input.value.length >= 20 &&
              input.parentNode.querySelector(".tippy")
            ) {
              input.parentNode.querySelector(".tippy").remove();
            }
          });
        });
      }
    },
  }, //Функция для изменения state
  actions: {
    calculateForm(
      { state, commit, getters },
      [type = "default", refresh = 0, refreshValue = false]
    ) {
      commit("clearError");
      if (refreshValue) {
        commit("clearInput");
      }
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
          if (typeof response.data === "object") {
            commit("setCalculateForm", [response, refreshValue]);
            commit("showRecoveryInformation");
            commit("filterCountries");
            if (state.countriesId === null || refreshValue)
              state.countriesId = +state.sortCountries[0].id;
            commit("filterCity");
          } else {
            commit("trashClick");
          }
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
    fetchGroupsAndCurrenciesFromPage({ commit, state }) {
      let data = document.getElementById("preloadGroupsAndCurrencies");
      if (window.innerWidth <= 768) {
        state.currenciesHideBuy = false;
      }

      if (!data) {
        this.dispatch("fetchGroupsAndCurrencies");
        return true;
      }
      let json = JSON.parse(data.innerHTML);
      commit("setGroupsAndCurrenciesFromPage", json);
    },
    fetchCalculateDiscount({ state, getters, commit }, uid) {
      axios
        .get(
          `${state.proxy}/json/calculate-discount?user_id=${uid}&course_id=${state.calculateData.course.id}&sell_amount=${state.sell_amount}&buy_amount=${state.buy_amount}`
        )
        .then((res) => {
          commit("calculateDiscount", res);
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
    countries(state) {
      return state.countries;
    },
    availableCities(state) {
      return state.availableCities;
    },
    countriesId(state) {
      return state.countriesId;
    },
    sortCountries(state) {
      return state.sortCountries;
    },
    sortCities(state) {
      return state.sortCities;
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
    sellAmountWithDiscount(state) {
      return state.sell_amount_with_discount;
    },
    buyAmountWithDiscount(state) {
      return state.buy_amount_with_discount;
    },
    isBorderActive(state) {
      return state.borderActive;
    },
  }, // Получения state
});
export default store;
