import { createApp } from "vue";


//Js
import vueDebounce from "vue-debounce";
import store from "./store/store.js";
import { mapMutations, mapActions, mapGetters } from "vuex";
//js src
import { Captcha } from "./assets/js/captcha.js";
import i18n from "./assets/js/multilanguage.js";
import { Support } from "./assets/js/support.js";
import { CurrencyModel } from "./assets/js/main.js";

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
import TheDetails from "./components/blocks/TheDetails.vue";
import TheTitle from "./components/blocks/TheTitle.vue";
import TheTitleBig from "./components/blocks/TheTitleBig.vue";
import TheSteps from "./components/blocks/TheSteps.vue";
import TheAnswers from "./components/blocks/TheAnswers.vue";
import TheField from "./components/blocks/TheField.vue";
import TheExchangeInformation from "./components/blocks/TheExchangeInformation.vue";
import TheCopyText from "./components/blocks/TheCopyText.vue";
import TheTable from "./components/blocks/TheTable.vue";
import TheDiscount from "./components/blocks/TheDiscount.vue";
import TheCurrenciesColumnSell from "./components/blocks/TheCurrenciesColumnSell.vue";
import TheCurrenciesColumnBuy from "./components/blocks/TheCurrenciesColumnBuy.vue";
import TheCounter from "./components/blocks/TheCounter.vue";

import TheInformation from "./components/sections/TheInformation.vue";
import TheAgreement from "./components/blocks/TheAgreement.vue";
import TheCheckbox from "./components/blocks/TheCheckbox.vue";
//Buttons
import TheButton from "./components/buttons/TheButton.vue";
import TheCurrenciesList from "./components/blocks/TheCurrenciesList.vue";
//404
import TheErrorButtons from "./components/buttons/TheErrorButtons.vue";
//Popups
import TheLeaveFeedback from "./components/popups/TheLeaveFeedback.vue";
import TheLacks from "./components/popups/TheLacks.vue";
import TheRecoveryInformation from "./components/popups/TheRecoveryInformation.vue";
import TheLacksWindow from "./components/popups/TheLacksWindow.vue";
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
import IconRefresh from "./components/icons/IconRefresh.vue";

createApp({
  data() {
    return {
      captcha: Captcha,
      currencyModel: CurrencyModel,
      support: Support,
      csrfToken: null,
      csrfParam: null,
      ///
      showLacks: false,
      showPopupInfoThisAccount: false,
      showPopupInfoToAccount: false,
      showPopupVerified: false,
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
    TheDetails,
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
    TheAgreement,
    TheCurrenciesList,
    TheErrorButtons,
    TheCheckbox,
    TheCurrenciesColumnSell,
    TheCurrenciesColumnBuy,
    TheCounter,
    //Buttons
    TheButton,
    //Popups
    TheLeaveFeedback,
    TheLacks,
    TheRecoveryInformation,
    TheLacksWindow,
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
    ]),
    isSellSource() {
      return ![28, 41, 42, 46, 49].includes(this.sellCurrency.id) && !this.currencyModel.isCash(this.sellCurrency.id) && !this.currencyModel.isCrypt(this.sellCurrency.id);
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
    ]),
    getValueByLanguage(object, field) {
      let nameWithLang = field.replace(
        "?",
        document.getElementById("language").value,
      );
      if (object[nameWithLang] !== undefined) {
        return object[nameWithLang];
      }
      return "undefined " + nameWithLang;
    },
    //Закрыть окно "Забыли пароль?"
 
  },
  mounted() {
    this.fetchGroupsAndCurrenciesFromPage();
    this.csrfToken = document.querySelector("meta[name=\"csrf-token\"]").content;
    this.csrfParam = document.querySelector("meta[name=\"csrf-param\"]").content;
  },
})
  .use(i18n)
  .use(store)
  .use(vueDebounce, {
    lock: false,
    listenTo: ["keyup", "paste"],
    defaultTime: "1500ms",
    fireOnEmpty: false,
  })
  .mount("#app");
