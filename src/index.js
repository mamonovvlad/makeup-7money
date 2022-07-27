import { createApp } from "vue";

//Js
import { Captcha } from "./assets/js/captcha.js";
import i18n from "./assets/js/multilanguage.js";
import { Support } from "./assets/js/support.js";
import { CurrencyModel } from "./assets/js/main.js";

const qs = require("querystring-es3");
import axios from "axios";

//Style
import "./assets/scss/main.scss";

//Sections
import TheHeader from "./components/sections/TheHeader.vue";
import TheFooter from "./components/sections/TheFooter.vue";
import TheLinks from "./components/sections/TheLinks.vue";
import TheSlider from "./components/sections/TheSlider.vue";
import TheReserves from "./components/sections/TheCurrencyReserves.vue";
import TheAchievements from "./components/sections/TheAchievements.vue";
//Blocks
import ThePublicInformation from "./components/blocks/ThePublicInformation.vue";
import ThePaymentCounter from "./components/blocks/ThePaymentCounter.vue";
import TheTimeProcessing from "./components/blocks/TheTimeProcessing.vue";
import TheShareSocialNetworks from "./components/blocks/TheShareSocialNetworks.vue";
import TheWarning from "./components/blocks/TheWarning.vue";
import TheAccountNavigation from "./components/blocks/TheAccountNavigation.vue";

import TheTitle from "./components/blocks/TheTitle.vue";
import TheTitleBig from "./components/blocks/TheTitleBig.vue";
import TheSteps from "./components/blocks/TheSteps.vue";
import TheAnswers from "./components/blocks/TheAnswers.vue";
import TheField from "./components/blocks/TheField.vue";
import TheExchangeInformation from "./components/blocks/TheExchangeInformation.vue";
import TheCopyText from "./components/blocks/TheCopyText.vue";
import TheTable from "./components/blocks/TheTable.vue";
import TheDiscount from "./components/blocks/TheDiscount.vue";
import TheCurrentTime from "./components/blocks/TheCurrentTime.vue";
import TheInformation from "./components/blocks/TheInformation.vue";
import TheAgreement from "./components/blocks/TheAgreement.vue";
import TheRefresh from "./components/blocks/TheRefresh.vue";
import TheCheckbox from "./components/blocks/TheCheckbox.vue";
//Buttons
import TheButton from "./components/buttons/TheButton.vue";
import TheCurrenciesList from "./components/blocks/TheCurrenciesList.vue";
//404
import TheErrorButtons from "./components/buttons/TheErrorButtons.vue";
//Popups
import TheLeaveFeedback from "./components/popups/TheLeaveFeedback.vue";
import TheLacks from "./components/popups/TheLacks.vue";
//Icons
import IconPig from "./components/icons/IconPig.vue";

import IconEngineeringWorks from "./components/icons/IconEngineeringWorks.vue";
import IconErrorPayment from "./components/icons/IconErrorPayment.vue";
import IconMail from "./components/icons/IconMail.vue";
import IconArrow from "./components/icons/IconArrow.vue";
import IconChat from "./components/icons/IconChat.vue";
import IconSuccessfulPayment from "./components/icons/IconSuccessfulPayment.vue";
import IconCheckStatus from "./components/icons/IconCheckStatus.vue";
import IconPersonalData from "./components/icons/IconPersonalData.vue";
import IconHistory from "./components/icons/IconHistory.vue";
import IconPartner from "./components/icons/IconPartner.vue";
import IconWithdrawReward from "./components/icons/IconWithdrawReward.vue";
import IconBuy from "./components/icons/IconBuy.vue";
import IconPadlock from "./components/icons/IconPadlock.vue";
import IconCreate from "./components/icons/IconCreate.vue";
import IconVerification from "./components/icons/IconVerification.vue";
import IconSearch from "./components/icons/IconSearch.vue";
import IconRandom from "./components/icons/IconRandom.vue";
import IconError from "./components/icons/IconError.vue";

createApp({
  data() {
    return {
      testNumber: "",
      captcha: Captcha,
      currencyModel: CurrencyModel,
      support: Support,
      theme: "light",
      currentTime: 60,
      csrfToken: null,
      csrfParam: null,
      showCurrencyExchange: false,
      currenciesHideSell: false,
      currenciesHideBuy: false,
      blockHide: false,
      detailsHide: false,
      ///
      // groups
      currencyGroups: {},
      sellCurrencyGroup: {},
      sellCurrencyGroupId: null,
      buyCurrencyGroup: {},
      buyCurrencyGroupId: null,

      // form vars
      sell_currency_id: null,
      buy_currency_id: null,
      sell_amount: 0,
      sell_amount_with_commission: 0,
      buy_amount: 0,
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
      sellCurrencies: {},
      buyCurrencies: {},
      allCurrencies: {},
      allCurrency: {},
      counter: 0,
      type: "default",
      myHistory: [],
    };
  },

  components: {
    //Sections
    TheHeader,
    TheAchievements,
    TheReserves,
    TheSlider,
    TheFooter,
    TheInformation,
    TheLinks,
    //Blocks
    ThePublicInformation,
    ThePaymentCounter,
    TheShareSocialNetworks,
    TheTitleBig,
    TheTitle,
    TheSteps,
    TheAnswers,
    TheField,
    TheExchangeInformation,
    TheDiscount,
    TheAccountNavigation,
    TheWarning,
    TheCopyText,
    TheTable,
    TheTimeProcessing,
    TheCurrentTime,
    TheAgreement,
    TheCurrenciesList,
    TheRefresh,
    TheErrorButtons,
    TheCheckbox,
    //Buttons
    TheButton,
    //Popups
    TheLeaveFeedback,
    TheLacks,
    //Icons
    IconPig,
    IconError,
    IconEngineeringWorks,
    IconErrorPayment,
    IconSuccessfulPayment,
    IconCheckStatus,
    IconMail,
    IconArrow,
    IconChat,
    IconPersonalData,
    IconHistory,
    IconPartner,
    IconWithdrawReward,
    IconBuy,
    IconPadlock,
    IconCreate,
    IconVerification,
    IconSearch,
    IconRandom,
  },
  computed: {
    getApiHost() {
      if (this.getLanguage === "en") {
        return "/en";
      } else if (this.getLanguage === "ua") {
        return "/ua";
      }
      return "";
    },
    getLanguage() {
      return document.getElementById("language").value;
    },
    getType() {
      if (this.type !== "default" && this.type !== "revert") {
        return "default";
      }
      return this.type;
    },
  },
  methods: {
    definitionTheme(theme) {
      this.theme = theme;
    },
    setDocumentTitle() {
      document.title = this.calculateData.course_title;
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", this.calculateData.course_description);
    },
    setUrl() {
      let url = "";
      if (this.getLanguage !== "ru") {
        url += "/" + this.getLanguage;
      }
      if (this.calculateData.length === 0) {
        history.pushState(false, document.title, url);
      } else {
        url +=
          "/exchange/" +
          this.sellCurrency.code.toLowerCase() +
          "/" +
          this.buyCurrency.code.toLowerCase();
        history.pushState({}, document.title, url);
      }
    },
    deleteAllHistory() {
      history.pushState(false, document.title, "/");
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", "");
    },
    getUrlWithoutLanguage() {
      let link = location.pathname;

      if (link[0] === "/") {
        link = link.substr(1);
      }

      let segments = link.split("/");
      if (segments.length > 0 && segments[0].length === 2) {
        segments.shift();
      }

      return segments.join("/");
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
      this.currentTime = 60;
    },

    //Exchange Templates
    trashClick() {
      this.deleteAllHistory();
      this.showCurrencyExchange = false;
      this.currenciesHideSell = true;
      this.currenciesHideBuy = true;
      this.blockHide = true;
      this.detailsHide = false;
      this.sell_currency_id = null;
      this.buy_currency_id = null;
      this.stopTimer();
    },
    hideBlocks() {
      let Give = this.sell_currency_id !== null;
      let Get = this.buy_currency_id !== null;

      if (Give && Get) {
        this.startTimer();
        this.showCurrencyExchange = true;
        this.currenciesHideSell = false;
        this.currenciesHideBuy = false;
        this.blockHide = false;
        this.detailsHide = true;
      } else if (Give === false) {
        this.sell_currency_id = null;
      } else if (Get === false) {
        this.buy_currency_id = null;
      }
    },
    sellHideBlock() {
      this.hideBlocks();
    },
    buyHideBlock() {
      this.hideBlocks();
    },

    refresh() {
      if (!this.calculateData || this.calculateData.isBackExchange !== 1) {
        return false;
      }
      let tempId = this.buy_currency_id;
      this.buy_currency_id = this.sell_currency_id;
      this.sell_currency_id = tempId;
      if (this.sell_currency_id !== null && this.buy_currency_id !== null) {
        this.calculateForm(this.getType, true);
      }
    },
    fetchSellCurrencies() {
      let self = this;
      axios
        .get(
          "http://proxy.local/" + this.getApiHost + "/json/get-sell-currencies",
          {
            params: {
              buy_currency_id: this.buy_currency_id,
            },
          }
        )
        .then(function (response) {
          self.sellCurrencies = response.data;
        });
    },
    fetchBuyCurrencies() {
      let self = this;
      axios
        .get(
          "http://proxy.local/" + this.getApiHost + "/json/get-buy-currencies",
          {
            params: {
              sell_currency_id: this.sell_currency_id,
            },
          }
        )
        .then(function (response) {
          self.buyCurrencies = response.data;
        });
    },
    getQueryParameters() {
      let uri = window.location.search.substring(1);
      return new URLSearchParams(uri);
    },
    checkQueryParameters() {
      let isSetFrom = this.checkQueryFromParameter();
      let isSetTo = this.checkQueryToParameter();
      if (isSetFrom && isSetTo) {
        this.calculateForm("default");
      }
    },
    checkQueryFromParameter() {
      let self = this;
      let params = this.getQueryParameters();
      let curFrom = params.get("cur_from");
      if (curFrom !== undefined) {
        Object.values(this.sellCurrencies).forEach(function (sellCurrency) {
          if (sellCurrency.code === curFrom) {
            self.setActiveCurrency("sell", sellCurrency.id);
            return sellCurrency.code === curFrom;
          }
        });
      }
    },
    checkQueryToParameter() {
      let self = this;
      let params = this.getQueryParameters();
      let curTo = params.get("cur_to");
      if (curTo !== undefined) {
        Object.values(self.buyCurrencies).forEach(async function (buyCurrency) {
          if (buyCurrency.code === curTo) {
            await self.setActiveCurrency("buy", buyCurrency.id, true, false);
            return buyCurrency.code === curTo;
          }
        });
      }
    },
    async fetchGroupsAndCurrencies() {
      let self = this;
      await axios
        .get(
          "http://proxy.local/" +
            this.getApiHost +
            "/json/get-groups-and-currencies"
        )
        .then(function (response) {
          self.currencyGroups = response.data.groups;
          self.allCurrencies = response.data.allCurrencies;
          self.sellCurrencies = response.data.allCurrencies;
          self.buyCurrencies = response.data.buyCurrencies;
        })
        .then(function (response) {
          self.checkLastCurrencies();
          self.checkQueryParameters();
        });
    },
    fetchGroupsAndCurrenciesFromPage() {
      let data = document.getElementById("preloadGroupsAndCurrencies");
      if (!data) {
        this.fetchGroupsAndCurrencies();
        return true;
      }
      let json = JSON.parse(data.innerHTML);

      this.currencyGroups = json.groups;
      this.allCurrencies = json.allCurrencies;
      this.sellCurrencies = json.allCurrencies;
      this.buyCurrencies = json.buyCurrencies;

      this.checkLastCurrencies();
      this.checkQueryParameters();
    },
    setActiveCurrency(
      type,
      id,
      isCalculate = true,
      isTrash = true,
      isSetUrl = true
    ) {
      if (type === "sell" && isTrash) {
        this.trashClick();
      }
      this.stopTimer();
      this[type + "_currency_id"] = id;
      this[type + "HideBlock"]();
      if (this.sell_currency_id === null && this.buy_currency_id !== null) {
        this.fetchSellCurrencies();
      }
      if (this.sell_currency_id !== null && this.buy_currency_id === null) {
        this.fetchBuyCurrencies();
      }
      if (
        isCalculate &&
        this.sell_currency_id !== null &&
        this.buy_currency_id !== null
      ) {
        this.calculateForm(this.getType, true);
        if (isSetUrl) {
          let self = this;
          setTimeout(function () {
            self.setUrl();
          }, 1000);
        }
      }
    },

    calculateForm(type = "default", refresh = false) {
      let self = this;
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
          "http://proxy.local/" + this.getApiHost + "/json/calculate",
          qs.stringify({
            sell_currency_id: self.sell_currency_id,
            buy_currency_id: self.buy_currency_id,
            sell_amount: self.sell_amount,
            buy_amount: self.buy_amount,
            is_verified: self.is_verified,
            type: type,
            city_id: self.city_id,
            lang: self.getLanguage,
            refresh: refresh,
          }),
          config
        )
        .then(function (response) {
          self.sellCurrencies = response.data.sellCurrencies;
          self.sell_currency_id = response.data.sell_currency_id;
          self.sellCurrency = response.data.sellCurrency;
          self.buyCurrencies = response.data.buyCurrencies;
          self.buy_currency_id = response.data.buy_currency_id;
          self.buyCurrency = response.data.buyCurrency;
          self.course = response.data.course;
          self.calculateData = response.data;
          self.sell_amount = response.data.sell_amount;
          self.sell_amount_with_commission =
            response.data.sell_amount_with_comission;
          self.buy_amount = response.data.buy_amount;
          self.buy_amount_with_commission =
            response.data.buy_amount_with_comission;
          if (refresh) self.sell_source = response.data.sell_source;
          if (refresh) self.buy_target = response.data.buy_target;

          self.setDocumentTitle();
        });
    },

    setCurrencyGroup(type, i) {
      this.stopTimer();
      this[type + "CurrencyGroup"] = this.currencyGroups[i];
      this[type + "CurrencyGroupId"] = this.currencyGroups[i].id;
    },
    resetCurrencyGroup(type) {
      this.stopTimer();
      this[type + "CurrencyGroup"] = {};
      this[type + "CurrencyGroupId"] = null;
    },
    callbackTimerFinish() {
      this.calculateForm(this.getType);
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
          this.setActiveCurrency(
            "sell",
            parseInt(inputHiddenLastSellId.value),
            true,
            false,
            false
          );
        }
        if (inputHiddenLastBuyId.value > 0) {
          this.setActiveCurrency(
            "buy",
            parseInt(inputHiddenLastBuyId.value),
            true,
            false,
            false
          );
        }
      }
    },
  },
  mounted() {
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
  },
  created() {
    this.fetchGroupsAndCurrenciesFromPage();
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer();
        this.startTimer();
        this.callbackTimerFinish();
      }
    },
  },
})
  .use(i18n)
  .mount("#app");
