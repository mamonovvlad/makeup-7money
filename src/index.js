window.Vue = require("vue");
import vueDebounce from "vue-debounce";
import dateFilter from "./filters/date.filter";
import { CurrencyModel } from "./source/js/main.js";
import { Support } from "./source/js/support.js";

import { Captcha } from "./source/js/captcha.js";
import "./source/js/lazysizes.min";
import "./source/sass/main.sass";
import { i18n } from "./source/js/multilanguage.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import axios from "axios";
import store from "./store/store";
import vuescroll from "vuescroll";
// import { NULL } from "node-sass";

Vue.use(vuescroll, {
  ops: {},
  name: "myScroll"
});

const qs = require("querystring");

Vue.use(vueDebounce, {
  lock: false,
  listenTo: ["keyup", "paste"],
  defaultTime: "1500ms",
  fireOnEmpty: false
});

Vue.filter("date", dateFilter);

Vue.component("preloader", require("./components/preloader.vue").default);

Vue.component(
  "header-main",
  require("./components/header/headerMain.vue").default
);
Vue.component(
  "social-network",
  require("./components/header/socialNetwork.vue").default
);
Vue.component("toggle", require("./components/header/toggle.vue").default);
Vue.component(
  "authorization",
  require("./components/header/authorization.vue").default
);
Vue.component(
  "entrance",
  require("./components/header/authorization/entrance.vue").default
);
Vue.component(
  "registration",
  require("./components/header/authorization/registration.vue").default
);
Vue.component(
  "password-recovery",
  require("./components/header/authorization/passwordRecovery.vue").default
);
Vue.component(
  "scoreboard",
  require("./components/home/exchange/scoreboard.vue").default
);
Vue.component("switched", require("./components/switched.vue").default);
Vue.component("footer-main", require("./components/footerMain.vue").default);
Vue.component(
  "unverifie-card",
  require("./components/popups/unverifiedCard.vue").default
);
Vue.component(
  "waiting-payment",
  require("./components/popups/changeStatus/waitingPayment.vue").default
);
Vue.component(
  "pending-receipt",
  require("./components/popups/changeStatus/pendingReceipt.vue").default
);
Vue.component(
  "queue-request",
  require("./components/popups/changeStatus/queueRequest.vue").default
);
Vue.component(
  "wrong-claim",
  require("./components/popups/changeStatus/wrongСlaim.vue").default
);
Vue.component(
  "customer-status",
  require("./components/popups/changeStatus/customerStatus.vue").default
);
Vue.component(
  "application-completed",
  require("./components/popups/changeStatus/applicationCompleted.vue").default
);
Vue.component(
  "important-information",
  require("./components/popups/changeStatus/importantInformation.vue").default
);
Vue.component(
  "fraud-warning",
  require("./components/popups/fraudWarning.vue").default
);

const app = new Vue({
  i18n,
  el: "#app",
  store,

  data() {
    return {
      activeCurrencyButton: true,
      showLinks: false,
      homeSeoText: true,
      currencyInfo: false,
      activeBurger: false,
      show_modal_verified: false,
      show_night_mode: false,
      dataFaq: {},
      showPopupInfoToAccount: false,
      showPopupInfoSellAmount: false,
      showPopupInfoThisAccount: false,
      showPopupVerified: false,
      captcha: Captcha,
      currencyModel: CurrencyModel,
      support: Support,
      animateBtn: false,
      currentTime: 60,
      verifiedTime: 30,
      timerSendingCode: null,
      timer: null,
      statusCheck: true,
      showLacks: false,
      instruction: false,
      waitingCard: true,
      verificationRejected: false,
      activeTimer: false,

      showCurrencyExchange: false,
      exchangeBlocksActive: false,
      currencySelectionActive: false,
      selectionBlocksActive: true,
      tabelShowSelection: true,
      currencyFlterActiveGive: null,
      currencyFlterActiveGet: null,
      reviewsActive: true,
      newsActive: false,
      blogActive: false,
      selectFirst: "1",
      selectSecond: "2",
      firstOption: 1,
      secondOption: 1,
      swiperOption: {
        slidesPerView: 3,
        breakpoints: {
          992: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      answersNum: null,
      openwindiwentrance: Boolean,
      openwindiwpersonalarea: Boolean,
      theme: "theme-light",

      //Page Home
      homeInfo: true,
      homeReserves: true,
      homeSuccess: true,
      //Reg
      show_entrance: false,
      active_entrance: false,
      active_registration: false,
      recovery: false,
      //Exchange Templates
      showSelectGet: false,
      arrowActiveGet: false,
      showSelectType: false,
      csrfToken: null,
      csrfParam: null,
      arrowActiveType: false,
      //Post Reward
      showSelect: false,
      arrowActive: false,

      // hide/show
      hideGive: false,
      hideGet: false,
      hideGiveBlock: true,
      hideGetBlock: true,

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
      myHistory: []
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    vuescroll
  },

  methods: {
    registration() {
      return this.$store.dispatch("registrationShow");
    },

    recalculate() {
      setTimeout(function() {
        let inputItem = document.getElementById("commissions_two");
        let sell_amount_with_commission = 50;
        let percent = 20;
        let amount = Math.round(
          sell_amount_with_commission -
            (sell_amount_with_commission * percent) / (100 + percent)
        );
        inputItem.value = amount;
      }, 1500);
    },

    toggleCurrencyButton() {
      this.activeCurrencyButton = !this.activeCurrencyButton;
    },
    russian_language() {
      return this.$store.dispatch("russian_language");
    },
    greatbritain_language() {
      return this.$store.dispatch("greatbritain_language");
    },
    ukraine_language() {
      return this.$store.dispatch("ukraine_language");
    },
    hiddenText() {
      let textSeo = document.querySelector(".text_seo");
      if (textSeo) {
        textSeo.innerHTML = "";
      }
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
    linkEn() {
      let element = document.getElementById("land_en");
      let header = document.getElementsByTagName("header");
      if (header.length > 0) {
        element.href = "/en/" + this.getUrlWithoutLanguage();
      }
    },
    linkUa() {
      let element = document.getElementById("land_ua");
      let header = document.getElementsByTagName("header");
      if (header.length > 0) {
        element.href = "/ua/" + this.getUrlWithoutLanguage();
      }
    },
    linkRus() {
      let element = document.getElementById("land_ru");
      let header = document.getElementsByTagName("header");
      if (header.length > 0) {
        element.href = "/" + this.getUrlWithoutLanguage();
      }
    },
    showBtnHeader() {
      let header = document.getElementsByTagName("header");
      if (header.length > 0) {
        //social
        let socialBlock = document.querySelector(".social");
        let socialActiv = document.querySelector(".social_active_link");
        let socialBtn = document.querySelector(".socialBtn");
        //account
        let accountBox = document.querySelector(".account_box");
        let accountBtn = document.querySelector(".accountBtn");
        //Lang
        let lang = document.querySelector(".lang");
        let langBox = document.querySelector(".lang_box");
        let langBtn = document.querySelector(".langBtn");

        //function Lang
        function toggleLang() {
          lang.classList.toggle("lang_activ_btn");
          langBox.classList.toggle("lang_activ_block");
          langBtn.classList.toggle("change_language_active");
          accountBox.classList.remove("account_active");
          accountBtn.classList.remove("account_activ_btn");
          socialBlock.classList.remove("social_activ_btn");
          socialActiv.classList.remove("social_activ");
        }
        langBtn.onclick = function(e) {
          e.stopPropagation();
          toggleLang();
        };
        document.addEventListener("click", e => {
          let lang_is_active = lang.classList.remove("lang_activ_btn");
          let langBtn_is_active = langBtn.classList.remove(
            "change_language_active"
          );
          let langBox_is_active = langBox.classList.remove("lang_activ_block");

          let langBtn_is = langBtn;

          if (
            !langBox_is_active &&
            !langBtn_is &&
            !langBtn_is_active &&
            lang_is_active
          ) {
            toggleLang();
          }
        });

        //function Account
        function toggleAccount() {
          accountBox.classList.toggle("account_active");
          accountBtn.classList.toggle("account_activ_btn");
          socialBlock.classList.remove("social_activ_btn");
          socialActiv.classList.remove("social_activ");
          lang.classList.remove("lang_activ_btn");
          langBtn.classList.remove("change_language_active");
          langBox.classList.remove("lang_activ_block");
        }
        accountBtn.onclick = function(e) {
          e.stopPropagation();
          toggleAccount();
        };
        document.addEventListener("click", e => {
          let accountBox_is_active = accountBox.classList.remove(
            "account_active"
          );
          let accountBtn_is_active = accountBtn.classList.remove(
            "account_activ_btn"
          );
          let accountBtn_is = accountBtn;

          if (!accountBtn_is && !accountBtn_is_active && accountBox_is_active) {
            toggleAccount();
          }
        });
        //function Social
        function toggleSocial() {
          socialBlock.classList.toggle("social_activ_btn");
          socialActiv.classList.toggle("social_activ");
          accountBox.classList.remove("account_active");
          accountBtn.classList.remove("account_activ_btn");
          lang.classList.remove("lang_activ_btn");
          langBtn.classList.remove("change_language_active");
          langBox.classList.remove("lang_activ_block");
        }
        socialBtn.onclick = function(e) {
          e.stopPropagation();
          toggleSocial();
        };
        document.addEventListener("click", e => {
          let socialBlock_is_active = socialBlock.classList.remove(
            "social_activ_btn"
          );
          let socialActiv_is_active = socialActiv.classList.remove(
            "social_activ"
          );
          let socialBtn_is = socialBtn;

          if (
            !socialBtn_is &&
            !socialActiv_is_active &&
            socialBlock_is_active
          ) {
            toggleSocial();
          }
        });
      }
    },
    confirmChecked() {
      var checkBox = document.getElementById("orderform-agree");
      if (checkBox && checkBox.checked === true) {
        this.enabledBtn();
      } else {
        this.disabledBtn();
      }
    },
    enabledBtn() {
      document.getElementById("order-submit").removeAttribute("disabled");
      document
        .getElementById("order-submit")
        .classList.remove("disabled_form_btn");
      document
        .getElementById("border-active")
        .classList.remove("confirm-border");
    },
    disabledBtn() {
      document.getElementById("order-submit").setAttribute("disabled", "");
      document
        .getElementById("order-submit")
        .classList.add("disabled_form_btn");
      document.getElementById("border-active").classList.add("confirm-border");
    },
    resendEmailExmo(e) {
      let self = this;
      if (!this.currencyModel.isExmo(this.buy_currency_id)) {
        return false;
      }
      let email = document.getElementById("exchange_mail").value;
      axios
        .post(
          this.getApiHost + "/order/confirm-email?email=" + email + "&resend=1"
        )
        .then(function(data) {
          if (data.data === 1) {
            self.show_modal_verified = true;
            document.querySelector(".sending_code").classList.remove("dn");
            self.verifiedStartTimer();
            self.disabledBtn();
            document
              .querySelector(".resend_email_result")
              .classList.remove("dn");
          }
        });
    },
    checkCodeExmo() {
      if (!this.currencyModel.isExmo(this.buy_currency_id)) {
        return false;
      }
      let email = document.getElementById("exchange_mail").value;
      let code = document.getElementById("verified_input").value;
      let self = this;
      axios
        .post(
          this.getApiHost +
            "/order/confirm-email?email=" +
            email +
            "&code=" +
            code
        )
        .then(function(data) {
          if (data.data > 0) {
            self.show_modal_verified = false;
            self.enabledBtn();
          } else {
            self.show_modal_verified = true;
            document
              .querySelector(".help-verified-code")
              .classList.remove("dn");
          }
        });
    },

    async checkEmailExmo() {
      this.hidePopupInfo();
      if (!this.currencyModel.isExmo(this.buy_currency_id)) {
        return true;
      }
      let email = document.getElementById("exchange_mail").value;
      let self = this;
      let isSubmit = false;
      await axios
        .post(this.getApiHost + "/order/confirm-email?email=" + email)
        .then(function(data) {
          if (parseInt(data.data) <= 0) {
            self.show_modal_verified = true;
            isSubmit = false;
          } else {
            self.show_modal_verified = false;
            isSubmit = true;
            document
              .getElementById("order-submit")
              .setAttribute("type", "submit");
            document.getElementById("order-submit").click();
          }
        });
      return isSubmit;
    },

    isExmo() {
      if (!this.currencyModel.isExmo(this.buy_currency_id)) {
        return true;
      }
      this.disabledBtn();
    },
    getSelectedOption(sel) {
      let opt;
      for (let i = 0, len = sel.options.length; i < len; i++) {
        opt = sel.options[i];
        if (opt.selected === true) {
          break;
        }
      }
      return opt;
    },
    copyToClipboard(elementId) {
      let aux = document.createElement("input", {
        name: "copyInfo"
      });
      aux.setAttribute("value", document.getElementById(elementId).innerHTML);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    },

    openNightMode() {
      let TIME_FROM = 0;
      let TIME_TO = 9;
      let date = new Date();
      let clientLocalHour = date.getHours();
      if (clientLocalHour >= TIME_FROM && clientLocalHour < TIME_TO) {
        this.show_night_mode = true;
      }
      // function getTime(offset) {
      //   var TIME_FROM = '0';
      //   var TIME_TO = 9;
      //   var d = new Date();
      //   var localTime = d.getTime();
      //   var localOffset = d.getTimezoneOffset() * 60000;
      //   // obtain UTC time in msec
      //   var utc = localTime + localOffset;
      //   // create new Date object for different city
      //   // using supplied offset
      //   var nd = new Date(utc + (3600000 * offset));
      //   var utc = new Date(utc);
      //   console.log(nd.toTimesString())
      //   var clientLocalHour = nd.toTimesString()

      //   return nd.toTimesString();
      // }
      // if (clientLocalHour >= TIME_FROM) {
      //   this.show_night_mode = true;
      //   console.log(1)
      // } else if (clientLocalHour < TIME_TO) {
      //   this.show_night_mode = false;
      //   console.log(2)
      // }
      // getTime('+3');
    },

    countdown() {
      this.time--;
      if (this.time === 0) {
        this.stopTimer();
        this.callbackTimerFinish();
        this.startTimer();
      }
    },

    verifiedStartTimer() {
      this.timerSendingCode = setInterval(() => {
        let language = document.getElementById("language");
        document.querySelector(".verified_small").classList.add("disabled");
        if (language.value == "ru") {
          this.setLocate("ru");
          document.querySelector(".verified_small").innerHTML =
            "Письмо отправленно";
        } else {
          this.setLocate("en");
          document.querySelector(".verified_small").innerHTML = "Email sent";
        }
        this.verifiedTime--;
      }, 1000);
    },
    verifiedStopTimer() {
      clearTimeout(this.timerSendingCode);
      this.verifiedTime = 30;
    },
    startTimer() {
      this.timer = setInterval(() => {
        // this.animateBtn = true;
        this.currentTime--;
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
      this.currentTime = 60;
    },
    hidePopupInfo() {
      this.showPopupInfoToAccount = false;
      this.showPopupInfoSellAmount = false;
      this.showPopupInfoThisAccount = false;
      this.showPopupVerified = false;
    },
    openPopupVerified() {
      this.showPopupVerified = true;
      this.showPopupInfoToAccount = false;
      this.showPopupInfoSellAmount = false;
      this.showPopupInfoThisAccount = false;
    },
    openPopupInfoToAccount() {
      this.showPopupInfoToAccount = true;
      this.showPopupInfoSellAmount = false;
      this.showPopupInfoThisAccount = false;
      this.showPopupVerified = false;
    },

    openPopupInfoSellAmount() {
      this.showPopupInfoSellAmount = true;
      this.showPopupInfoToAccount = false;
      this.showPopupInfoThisAccount = false;
      this.showPopupVerified = false;
    },

    openPopupInfoThisAccount() {
      this.showPopupInfoThisAccount = true;
      this.showPopupInfoSellAmount = false;
      this.showPopupInfoToAccount = false;
    },

    openLacks() {
      this.showLacks = true;
    },
    showTimer() {
      this.activeTimer = !this.activeTimer;
      this.activeBurger = !this.activeBurger;
    },
    reviewsToggle() {
      (this.reviewsActive = true),
        (this.newsActive = false),
        (this.blogActive = false);
    },
    newsToggle() {
      (this.reviewsActive = false),
        (this.newsActive = true),
        (this.blogActive = false);
    },
    blogToggle() {
      (this.reviewsActive = false),
        (this.newsActive = false),
        (this.blogActive = true);
    },
    setLocate(locale) {
      this.$i18n.locale = locale;
    },
    language() {
      let language = document.getElementById("language");
      if (language.value == "ru") {
        this.setLocate("ru");
        this.russian_language();
      } else if (language.value == "en") {
        this.setLocate("en");
        this.greatbritain_language();
      } else {
        this.setLocate("ua");
        this.ukraine_language();
      }
    },
    login() {
      let login = document.getElementById("login");
      if (login.value > 0) {
        this.openwindiwentrance = false;
        this.openwindiwpersonalarea = true;
      } else {
        this.openwindiwentrance = true;
        this.openwindiwpersonalarea = false;
      }
    },
    updatetheme() {
      this.theme = "theme-light";
    },
    themedark() {
      this.theme = "theme-dark";
    },
    toggleopen(i) {
      this.answersNum = i;
    },
    hidden() {
      if (window.innerWidth < 768) {
        this.homeInfo = false;
        this.homeReserves = false;
        this.homeSuccess = false;
      }
    },
    //Открыть окно входа
    entrance() {
      this.show_entrance = true;
      this.active_entrance = true;
      this.active_registration = false;
    },
    // //Открыть окно смена пароля
    show_password_recovery() {
      this.recovery = true;
      this.show_entrance = false;
    },

    //registration

    // registration() {
    //   this.show_entrance = true;
    //   this.active_entrance = false;
    //   this.active_registration = true;
    // },
    //Exchange Templates
    selectOption(selectList) {
      (this.titleSelected.title = selectList.title),
        (this.titleSelected.icon = selectList.icon);
      this.showSelect = false;
      this.arrowActive = false;
    },
    selectOptionGet(selectListGet) {
      (this.titleSelectedGet.title = selectListGet.title),
        (this.titleSelectedGet.icon = selectListGet.icon);
      this.showSelectGet = false;
      this.arrowActiveGet = false;
    },
    selectOptionType(selectListType) {
      (this.titleSelectedType.title = selectListType.title),
        (this.titleSelectedType.icon = selectListType.icon);
      this.showSelectType = false;
      this.arrowActiveType = false;
    },
    selectShow() {
      this.showSelect = !this.showSelect;
      this.arrowActive = !this.arrowActive;
    },
    selectShowGet() {
      this.showSelectGet = !this.showSelectGet;
      this.arrowActiveGet = !this.arrowActiveGet;
    },
    selectShowType() {
      this.showSelectType = !this.showSelectType;
      this.arrowActiveType = !this.arrowActiveType;
    },
    trashClick() {
      this.deleteAllHistory();
      this.homeSeoText = true;
      if (window.innerWidth >= 993) {
        this.showCurrencyExchange = false;
        this.exchangeBlocksActive = false;
        this.currencySelectionActive = false;
        this.trashBtn = false;
        this.selectionBlocksActive = true;
        this.hideGet = false;
        this.hideGive = false;
        this.sell_currency_id = null;
        this.buy_currency_id = null;
        this.homeInfo = true;
        this.homeReserves = true;
        this.homeSuccess = true;
        this.currencyInfo = false;
        this.stopTimer();
      } else if (window.innerWidth >= 769) {
        this.exchangeBlocksActive = false;
        this.currencySelectionActive = false;
        this.tabelShowSelection = true;
        this.selectionBlocksActive = true;
        this.showCurrencyExchange = false;
        this.currencyInfo = false;
        this.trashBtn = false;
        this.hideGet = false;
        this.hideGive = false;
        this.sell_currency_id = null;
        this.buy_currency_id = null;
        // this.homeInfo = true;
        // this.homeReserves = true;
        // this.homeSuccess = true;
        this.stopTimer();
      } else if (window.innerWidth < 768) {
        this.showCurrencyExchange = false;
        this.exchangeBlocksActive = false;
        this.currencySelectionActive = false;
        this.tabelShowSelection = false;
        this.currencyInfo = false;
        this.selectionBlocksActive = true;
        this.trashBtn = false;
        this.hideGet = false;
        this.hideGive = false;
        this.hideGiveBlock = true;
        this.hideGetBlock = false;
        this.tabelShowSelection = true;
        this.stopTimer();
      } else {
      }
    },
    hideBlocks() {
      let Give = this.sell_currency_id !== null;
      let Get = this.buy_currency_id !== null;
      let windowPc = window.innerWidth >= 993;
      let windowTablet = window.innerWidth >= 769;
      //Сжатие блоков на ПК
      if (windowPc && Give && Get) {
        this.startTimer();
        this.selectionBlocksActive = false;
        this.currencySelectionActive = true;
        this.showCurrencyExchange = true;
        this.exchangeBlocksActive = true;
        this.currencyInfo = true;
        this.homeInfo = false;
        this.homeReserves = false;
        this.homeSuccess = false;
      } else if (Give === false) {
        this.sell_currency_id = null;
      } else if (Get === false) {
        this.buy_currency_id = null;
      } else if (windowTablet && Give && Get) {
        //Сжатие блоков на планшетах
        this.showCurrencyExchange = true;
        this.tabelShowSelection = false;
        this.exchangeBlocksActive = true;
        this.startTimer();
        this.homeInfo = false;
        this.homeReserves = false;
        this.homeSuccess = false;
        this.currencyInfo = true;
      } else {
        this.showCurrencyExchange = false;
        this.currencySelectionActive = false;
        this.exchangeBlocksActive = false;
        this.tabelShowSelection = true;
        this.selectionBlocksActive = true;
        this.trashBtn = false;
      }
    },
    mobileBlock() {
      if (window.innerWidth <= 768) {
        this.hideGiveBlock = true;
        this.hideGetBlock = false;
        this.currencyInfo = false;
        this.homeSeoText = true;
        this.sellHideBlock();
      }
    },
    sellHideBlock() {
      this.hideGive = true;
      this.hideBlocks();
    },
    buyHideBlock() {
      this.hideGet = true;
      this.hideBlocks();
      if (window.innerWidth <= 768) {
        this.hideGetBlock = false;
        this.tabelShowSelection = false;
        this.showCurrencyExchange = true;
        this.currencyInfo = true;
        this.exchangeBlocksActive = true;
        this.startTimer();
      }
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
    getValueByLanguage(object, field) {
      let nameWithLang = field.replace(
        "?",
        document.getElementById("language").value
      );
      if (object[nameWithLang] !== undefined) {
        return object[nameWithLang];
      }
      return "undefined " + nameWithLang;
    },
    fetchCurrencyGroups() {
      let self = this;
      axios
        .get(this.getApiHost + "/json/get-currency-groups")
        .then(function(response) {
          self.currencyGroups = response.data;
        });
    },
    fetchSellCurrencies() {
      let self = this;
      axios
        .get(this.getApiHost + "/json/get-sell-currencies", {
          params: {
            buy_currency_id: this.buy_currency_id
          }
        })
        .then(function(response) {
          self.sellCurrencies = response.data;
        });
    },
    fetchFaq() {
      let self = this;
      axios.get(this.getApiHost + "/json/faq").then(function(response) {
        self.dataFaq = response.data;
      });
    },
    fetchBuyCurrencies() {
      let self = this;
      axios
        .get(this.getApiHost + "/json/get-buy-currencies", {
          params: {
            sell_currency_id: this.sell_currency_id
          }
        })
        .then(function(response) {
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
        Object.values(this.sellCurrencies).forEach(function(sellCurrency) {
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
        Object.values(self.buyCurrencies).forEach(async function(buyCurrency) {
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
        .get(this.getApiHost + "/json/get-groups-and-currencies")
        .then(function(response) {
          self.currencyGroups = response.data.groups;
          self.allCurrencies = response.data.allCurrencies;
          self.sellCurrencies = response.data.allCurrencies;
          self.buyCurrencies = response.data.buyCurrencies;
        })
        .then(function(response) {
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
    checkExistCurrency(id, type) {
      if (type === "sell") {
        return (
          Object.values(this.sellCurrencies).filter(
            currency => parseInt(currency.id) === parseInt(id)
          ).length > 0
        );
      } else if (type === "buy") {
        return (
          Object.values(this.buyCurrencies).filter(
            currency => parseInt(currency.id) === parseInt(id)
          ).length > 0
        );
      }
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
      // /*if (!this.checkExistCurrency(id, type)) {
      //   return false;
      // }*/
      if (window.innerWidth <= 768) {
        this.hideGiveBlock = false;
        this.hideGetBlock = true;
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
          setTimeout(function() {
            self.setUrl();
          }, 1000);
        }
      }
    },

    calculateForm(type = "default", refresh = false) {
      this.homeSeoText = false;
      let self = this;
      document
        .querySelectorAll(".form_exchange .help-block")
        .forEach(function(el, i) {
          el.innerHTML = "";
        });
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      axios
        .post(
          this.getApiHost + "/json/calculate",
          qs.stringify({
            sell_currency_id: self.sell_currency_id,
            buy_currency_id: self.buy_currency_id,
            sell_amount: self.sell_amount,
            buy_amount: self.buy_amount,
            is_verified: self.is_verified,
            type: type,
            city_id: self.city_id,
            lang: self.getLanguage,
            refresh: refresh
          }),
          config
        )
        .then(function(response) {
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
          document
            .getElementById("order-submit")
            .setAttribute("type", "submit");
          if (self.currencyModel.isExmo(self.buy_currency_id)) {
            document
              .getElementById("order-submit")
              .setAttribute("type", "button");
          }
          self.setDocumentTitle();
          self.hiddenText();
        });
    },
    updateSellAmount(val, e) {
      this.type = "default";
      if (
        this.sell_amount.length <= 0 ||
        this.sell_amount === 0 ||
        this.sell_amount === ""
      ) {
        return;
      }
      let float = this.sell_amount;
      if (typeof this.sell_amount === "string") {
        float = parseFloat(this.sell_amount.replace(/,/g, "."));
        if (float <= 0) {
          float = 0;
        }
      }
      this.sell_amount = float;
      if (this.sell_amount > 0) {
        this.calculateForm("default");
      }
    },
    updateSellAmountWithCommission(val, e) {
      if (
        this.sell_amount_with_commission.length <= 0 ||
        this.sell_amount_with_commission === 0 ||
        this.sell_amount_with_commission === ""
      ) {
        return;
      }
      let float = this.sell_amount_with_commission;
      if (typeof this.sell_amount_with_commission === "string") {
        float = parseFloat(this.sell_amount_with_commission.replace(/,/g, "."));
        if (float <= 0) {
          float = 0;
        }
      }
      let sellCommissionPercentElement = document.getElementById(
        "sell_commission_percent"
      );
      if (sellCommissionPercentElement === undefined) {
        return;
      }
      let sellCommissionPercent = parseFloat(
        sellCommissionPercentElement.innerText.replace(/,/g, ".")
      );
      let sellAmount =
        this.sell_amount_with_commission -
        (this.sell_amount_with_commission * sellCommissionPercent) /
          (100 + sellCommissionPercent);
      if (sellAmount > 0) {
        this.sell_amount = sellAmount.toFixed(2);
        this.updateSellAmount(val, e);
      }
    },
    updateBuyAmount(val, e) {
      this.type = "revert";
      if (
        this.buy_amount.length <= 0 ||
        this.buy_amount === 0 ||
        this.buy_amount === ""
      ) {
        return;
      }
      let float = parseFloat(this.buy_amount.replace(/,/g, "."));
      if (float <= 0) {
        float = 0;
      }
      this.buy_amount = float;
      if (this.buy_amount > 0) {
        this.calculateForm("revert");
      }
    },
    setFirstCurrencies() {
      let self = this;
      axios
        .get(this.getApiHost + "/json/get-first-active-course")
        .then(function(response) {
          self.sell_currency_id = response.data.sell_currency_id;
          self.buy_currency_id = response.data.buy_currency_id;
          self.calculateForm();
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
    setIsVerified(e) {
      this.is_verified = e.target.checked ? 1 : 0;
      this.calculateForm("revert");
    },
    setOfExchange(e) {
      this.of_exchange = e.target.checked ? 1 : 0;
    },
    setCityId(e) {
      let selected = this.getSelectedOption(e.target);
      this.city_id = parseInt(selected.value);
      this.calculateForm(this.getType);
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
    formDisabled() {
      document.getElementById("order-submit").onclick = function() {
        setTimeout(function() {
          document.getElementById("order-submit").setAttribute("disabled", "");
          document
            .getElementById("order-submit")
            .classList.add("disabled_form_btn");
          document
            .getElementById("border-active")
            .classList.add("confirm-border");
        }, 0);
      };
    }
  },
  mounted() {
    this.linkRus();
    this.linkEn();
    this.linkUa();
    this.showBtnHeader();
    this.mobileBlock();
    this.login();
    this.theme = localStorage.getItem("theme") || "theme-light";
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
    this.language();
  },
  computed: {
    getApiHost() {
      let windowHost = window.location.host;
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
    }
  },
  beforeMount() {
    this.hidden();
  },
  beforeUpdate() {
    this.login();
  },
  updated() {
    this.login();
  },
  created() {
    this.openNightMode();
    if (document.querySelector(".exchange_box")) {
      this.fetchGroupsAndCurrenciesFromPage();
    }
    if (document.querySelector(".answers")) {
      this.fetchFaq();
    }
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer();
        this.startTimer();
        this.callbackTimerFinish();
      }
    },
    verifiedTime(timerSendingCode) {
      if (timerSendingCode === 0) {
        this.verifiedStopTimer();
        document.querySelector(".sending_code").classList.add("dn");
        document.querySelector(".verified_small").classList.remove("disabled");
      }
    }
  }
}).$mount("#app");
