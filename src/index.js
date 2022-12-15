import { createApp } from "vue";

//Js
import vueDebounce from "vue-debounce";
import store from "./store/store.js";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { TippyPlugin } from "tippy.vue";
//js src
import i18n from "./assets/js/multilanguage.js";
import { Support } from "./assets/js/support.js";
import { CurrencyModel } from "./assets/js/currency-model.js";

//Style
import "./assets/scss/main.scss";

//Sections
import TheHeader from "./components/sections/TheHeader.vue";
import TheFooter from "./components/sections/TheFooter.vue";
import TheLinks from "./components/sections/TheLinks.vue";
import TheSlider from "./components/sections/TheSlider.vue";
import TheReserves from "./components/sections/TheCurrencyReserves.vue";
import TheAchievements from "./components/sections/TheAchievements.vue";
import TheCheckStatus from "./components/sections/TheCheckStatus.vue";
//Blocks
import TheQuestionInformation from "./components/blocks/TheQuestionInformation.vue";
import ThePublicInformation from "./components/blocks/ThePublicInformation.vue";
import ThePaymentCounter from "./components/blocks/ThePaymentCounter.vue";
import TheShareSocialNetworks from "./components/blocks/TheShareSocialNetworks.vue";
import TheAccountNavigation from "./components/blocks/TheAccountNavigation.vue";
import TheTitle from "./components/blocks/TheTitle.vue";
import TheTitleBig from "./components/blocks/TheTitleBig.vue";
import TheSteps from "./components/blocks/TheSteps.vue";
import TheAnswers from "./components/blocks/TheAnswers.vue";
import TheField from "./components/blocks/TheField.vue";
import TheExchangeInformation from "./components/blocks/TheExchangeInformation.vue";
import TheDiscount from "./components/blocks/TheDiscount.vue";
import TheCurrenciesColumnSell from "./components/blocks/TheCurrenciesColumnSell.vue";
import TheCurrenciesColumnBuy from "./components/blocks/TheCurrenciesColumnBuy.vue";
import TheCounter from "./components/blocks/TheCounter.vue";
import TheCurrentTime from "./components/blocks/TheCurrentTime.vue";
import TheInformation from "./components/sections/TheInformation.vue";
import TheTimeProcessing from "./components/blocks/TheTimeProcessing.vue";
import ThePreloader from "./components/blocks/ThePreloader.vue";
//Buttons
import TheButton from "./components/buttons/TheButton.vue";
import TheCurrenciesList from "./components/blocks/TheCurrenciesList.vue";
import TheClose from "./components/buttons/TheClose.vue";
//404
import TheErrorButtons from "./components/buttons/TheErrorButtons.vue";
//Popups
import TheRecoveryInformation from "./components/popups/TheRecoveryInformation.vue";
import TheLacksWindow from "./components/popups/TheLacksWindow.vue";
//Icons
import IconConfetti from "./components/icons/IconConfetti.vue";
import IconCopy from "./components/icons/IconCopy.vue";
import IconPig from "./components/icons/IconPig.vue";
import IconTimeProcessing from "./components/icons/IconTimeProcessing.vue";
import IconEngineeringWorks from "./components/icons/IconEngineeringWorks.vue";
import IconErrorPayment from "./components/icons/IconErrorPayment.vue";
import IconMail from "./components/icons/IconMail.vue";
import IconArrow from "./components/icons/IconArrow.vue";
import IconChat from "./components/icons/IconChat.vue";
import IconSuccessfulPayment from "./components/icons/IconSuccessfulPayment.vue";
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
import IconRefresh from "./components/icons/IconRefresh.vue";
import IconThanks from "./components/icons/IconThanks.vue";

createApp({
  data() {
    return {
      currencyModel: CurrencyModel,
      support: Support,
      csrfToken: null,
      csrfParam: null,
      ///
      showLacks: false,
      error: true,
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
    TheCheckStatus,
    //Blocks
    TheQuestionInformation,
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
    TheCurrenciesList,
    TheErrorButtons,
    TheCurrenciesColumnSell,
    TheCurrenciesColumnBuy,
    TheCounter,
    TheCurrentTime,
    TheTimeProcessing,
    ThePreloader,
    //Buttons
    TheButton,
    TheClose,
    //Popups
    TheRecoveryInformation,
    TheLacksWindow,
    //Icons
    IconConfetti,
    IconCopy,
    IconPig,
    IconThanks,
    IconTimeProcessing,
    IconError,
    IconEngineeringWorks,
    IconErrorPayment,
    IconSuccessfulPayment,
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
    IconRefresh,
  },
  computed: {
    ...mapGetters([
      "getLang",
      "colorSpectrum",
      "getType",
      "sellCurrency",
      "buyCurrency",
      "sellAmount",
      "calculateData",
      "detailsHide",
      "course",
    ]),
    isSellSource() {
      return (
        ![28, 41, 42, 46, 49].includes(this.sellCurrency.id) &&
        !this.currencyModel.isCash(this.sellCurrency.id) &&
        !this.currencyModel.isCrypt(this.sellCurrency.id)
      );
    },
    isDetails() {
      return this.detailsHide;
    },
    isCalculateData() {
      return (
        this.calculateData.max_buy_amount > this.calculateData.min_buy_amount
      );
    },
  },
  methods: {
    ...mapActions(["fetchGroupsAndCurrenciesFromPage"]),
    ...mapMutations([
      "callbackTimerFinish",
      // "updateSellAmount",
      // "updateBuyAmount",
      "calculationAmount",
      "calculationAmountCommission",
      "calculationFormSellAmountCommission",
      "calculationFormBuyAmountCommission",
      "setIsVerified",
      "setOfExchange",
      "trashClick",
      "copyText",
      "captcha",
      "calculateDefault",
      "calculateRevert",
    ]),
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
    //Закрыть окно "Забыли пароль?"
    confirmChecked() {
      let checkBox = document.getElementById("orderform-agree");
      if (checkBox && checkBox.checked === true) {
        this.enabled();
      } else {
        this.disabled();
      }
    },
    enabled() {
      let button = document.getElementById("order-submit");
      button.removeAttribute("disabled");
      button.classList.remove("disabled");
      this.error = false;
    },
    disabled() {
      let button = document.getElementById("order-submit");
      button.setAttribute("disabled", "disabled");
      button.classList.add("disabled");
      this.error = true;
    },
  },
  mounted() {
    this.fetchGroupsAndCurrenciesFromPage();
    this.captcha();
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
  },
})
  .use(i18n)
  .use(TippyPlugin)
  .use(vueDebounce, {
    lock: false,
    listenTo: ["keyup", "paste"],
    defaultTime: "1500ms",
    fireOnEmpty: false,
  })
  .use(store)
  .mount("#app");
