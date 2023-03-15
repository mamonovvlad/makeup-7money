import { createApp } from "vue";

//Js
import { mapMutations, mapActions, mapGetters } from "vuex";
import store from "./store/store.js";

//js src
import i18n from "./assets/js/multilanguage.js";
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
import TheConfetti from "./components/blocks/TheConfetti.vue";
import TheTitleDetails from "./components/blocks/TheTitleDetails.vue";
import TheCustomSelect from "./components/blocks/TheCustomSelect.vue";
import ThePublicInformation from "./components/blocks/ThePublicInformation.vue";
import TheCurrenciesColumnSell from "./components/blocks/TheCurrenciesColumnSell.vue";
import TheCurrenciesColumnBuy from "./components/blocks/TheCurrenciesColumnBuy.vue";
import TheQuestionInformation from "./components/blocks/TheQuestionInformation.vue";
import ThePaymentCounter from "./components/blocks/ThePaymentCounter.vue";
import TheRecentExchanges from "./components/sections/TheRecentExchanges.vue";
import TheShareSocialNetworks from "./components/blocks/TheShareSocialNetworks.vue";
import TheAccountNavigation from "./components/blocks/TheAccountNavigation.vue";
import TheTitle from "./components/blocks/TheTitle.vue";
import TheTitleBig from "./components/blocks/TheTitleBig.vue";
import TheSteps from "./components/blocks/TheSteps.vue";
import TheAnswers from "./components/blocks/TheAnswers.vue";
import TheField from "./components/blocks/TheField.vue";
import TheExchangeInformation from "./components/blocks/TheExchangeInformation.vue";
import TheDiscount from "./components/blocks/TheDiscount.vue";
import TheCounter from "./components/blocks/TheCounter.vue";
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
import TheNightMode from "./components/popups/TheNightMode.vue";
import TheLacksButton from "./components/popups/TheLacksButton.vue";
//Icons
import IconSuccess from "./components/icons/IconSuccess.vue";
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
      fired: false,
      currencyModel: CurrencyModel,
      csrfToken: null,
      csrfParam: null,
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
    TheConfetti,
    TheTitleDetails,
    TheCustomSelect,
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
    TheTimeProcessing,
    ThePreloader,
    TheRecentExchanges,
    //Buttons
    TheButton,
    TheClose,
    //Popups
    TheRecoveryInformation,
    TheLacksButton,
    TheNightMode,
    //Icons
    IconSuccess,
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
      "selectName",
      "sellAmountWithDiscount",
      "buyAmountWithDiscount",
      "isBorderActive",
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
  },
  methods: {
    ...mapActions(["fetchGroupsAndCurrenciesFromPage"]),
    ...mapMutations([
      "callbackTimerFinish",
      "updateSellAmount",
      "updateBuyAmount",
      "setIsVerified",
      "setOfExchange",
      "calculate",
      "captcha",
      "calculationAmountCommission",
      "confirmChecked",
      "viewPassword",
      "scrollToError",
      "setCityId",
      "characterCountCheck",
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
    addLinkJivosite() {
      let widget_id = "nYOG7mbRoi";
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "//code.jivosite.com/script/widget/" + widget_id;
      let ss = document.getElementsByTagName("script")[0];
      ss.parentNode.insertBefore(s, ss);
    },
    startJivosite() {
      let d = document;
      let w = window;
      if (d.readyState === "complete") {
        this.addLinkJivosite();
      } else {
        if (w.attachEvent) {
          w.attachEvent("onload", this.addLinkJivosite);
        } else {
          w.addEventListener("load", this.addLinkJivosite, false);
        }
      }
    },
  },
  mounted() {
    this.fetchGroupsAndCurrenciesFromPage();
    this.captcha();
    this.characterCountCheck();
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    this.csrfParam = document.querySelector('meta[name="csrf-param"]').content;
    document.addEventListener("scroll", () => {
      if (this.fired === false) {
        this.fired = true;
        setTimeout(() => {
          this.startJivosite();
        }, 5000);
      }
    });
  },
})
  .use(i18n)
  .use(store)
  .mount("#app");
