<template>
  <header class="header bg-background-descr">
    <div class="app_fon"></div>
    <div class="container">
      <div class="header_box">
        <div class="header_block">
          <a
            :href="$t('linkLogo')"
            class="header_logo"
            id="logo"
            @click.prevent="clearHistory"
          >
            <div class="logo"></div>
          </a>
          <toggle
            class="toggle"
            @sunchanged="updatetheme"
            @darkchanged="themedark"
          ></toggle>
          <div class="header_time text-copy-main">
            <p class>
              {{ $t("schedule") }}
              <span class="text-copy-descr">{{ $t("workingHours") }}</span>
            </p>
            <p>
              {{ $t("time") }}
              <span class="text-copy-descr">{{ date | date("time") }}</span>
            </p>
          </div>
        </div>
        <div class="header_block">
          <div class="header_buttons text-copy-main">
            <div class="btn_status bg-background-status">
              <a :href="$t('checkStatus')" class="status text-copy-btngreen">{{
                  $t("checkOpSt")
                }}</a>
            </div>
            <div
              class="icon langActive lang shadow_btn_white bg-background-main"
              :class="{ lang_activ_btn }"
            >
              <button class="btn_icon show_icon langBtn">
                <span class="text-copy-main" :class="{ active: block_russia }">RU</span>
                <span :class="{ active: block_greatbritain }">EN</span>
                <span :class="{ active: block_ukraine }">UA</span>
              </button>
              <div
                class="lang_box bg-background-main"
                :class="{ lang_activ_block }"
              >
                <button
                  :class="{ hidden: block_greatbritain }"
                  class="btn_lang   bg-background-main"
                >
                  <a id="land_en" href="/en">
                    <span>EN</span>
                  </a>
                </button>
                <button
                  :class="{ hidden: block_russia }"
                  class="btn_lang   bg-background-main"
                >
                  <a id="land_ru" href="/">
                    <span>RU</span>
                  </a>
                </button>
                <button
                  :class="{ hidden: block_ukraine }"
                  class="btn_lang   bg-background-main">
                  <a id="land_ua" href="/ua">
                    <span>UA</span>
                  </a>
                </button>
              </div>
            </div>
            <div class="icon shadow_btn_white bg-background-main">
              <button
                class="btn_icon accountBtn btn_svg"
                :class="{ active_personal_area }"
              >
                <svg
                  class="account"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.791 1.97266H8.2357C4.78945 1.97266 1.98633 4.77578 1.98633 8.22203V21.7773C1.98633 25.2236 4.78945 28.0267 8.2357 28.0267H21.791C25.2373 28.0267 28.0404 25.2236 28.0404 21.7773V8.22297C28.0404 4.77672 25.2373 1.97266 21.791 1.97266ZM15.0138 6.22609C18.4741 6.22609 21.2904 9.04234 21.2904 12.5036C21.2904 15.9639 18.4741 18.7802 15.0138 18.7802C11.5535 18.7802 8.73727 15.9648 8.73727 12.5036C8.73633 9.04234 11.5526 6.22609 15.0138 6.22609ZM25.2279 21.7773C25.2279 23.672 23.6857 25.2142 21.791 25.2142H8.2357C6.34102 25.2142 4.79883 23.672 4.79883 21.7773V21.378C5.52914 19.6408 6.67851 18.093 8.17008 16.9155C9.6232 19.1617 12.1451 20.6542 15.0138 20.6542C17.8826 20.6542 20.4035 19.1617 21.8576 16.9164C23.3491 18.0939 24.4976 19.6417 25.2288 21.378V21.7773H25.2279Z"
                    fill="#7F848C"
                  />
                </svg>
              </button>
              <div
                class="account_box bg-background-main shadow_btn_white"
                :class="{ account_active }"
              >
                <div class="arrow"></div>
                <div class="account_box_block" v-if="openwindiwentrance">
                  <button class="text-copy-main" @click="entrance">
                    {{ $t("logIn") }}
                  </button>
                  <button class="text-copy-main" @click="registration">
                    {{ $t("signUp") }}
                  </button>
                </div>
                <div class v-if="openwindiwpersonalarea">
                  <a :href="$t('personalAccountLink')" class="text-copy-main">{{
                      $t("personalAccount")
                    }}</a>
                  <a
                    class="text-copy-main"
                    data-method="post"
                    :href="$t('logoutAction')"
                  >{{ $t("logout") }}</a
                  >
                </div>
              </div>
            </div>
            <div
              class="social icon shadow_btn_white bg-background-main bg-background-main"
            >
              <button class="btn_icon btn_svg socialBtn">
                <svg
                  class="social-svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.2343 3.99994C22.2343 5.79492 20.7793 7.25006 18.9843 7.25006C17.1893 7.25006 15.7344 5.79492 15.7344 3.99994C15.7344 2.20514 17.1893 0.75 18.9843 0.75C20.7793 0.75 22.2343 2.20514 22.2343 3.99994Z"
                    fill="#7F848C"
                  />
                  <path
                    d="M18.9843 8.00006C16.7783 8.00006 14.9844 6.20599 14.9844 3.99994C14.9844 1.79407 16.7783 0 18.9843 0C21.1904 0 22.9843 1.79407 22.9843 3.99994C22.9843 6.20599 21.1904 8.00006 18.9843 8.00006ZM18.9843 1.5C17.6053 1.5 16.4844 2.62207 16.4844 3.99994C16.4844 5.37799 17.6053 6.50006 18.9843 6.50006C20.3633 6.50006 21.4843 5.37799 21.4843 3.99994C21.4843 2.62207 20.3633 1.5 18.9843 1.5Z"
                    fill="#7F848C"
                  />
                  <path
                    d="M22.2343 20.0001C22.2343 21.7949 20.7793 23.2501 18.9843 23.2501C17.1893 23.2501 15.7344 21.7949 15.7344 20.0001C15.7344 18.2051 17.1893 16.75 18.9843 16.75C20.7793 16.75 22.2343 18.2051 22.2343 20.0001Z"
                    fill="#7F848C"
                  />
                  <path
                    d="M18.9843 24.0001C16.7783 24.0001 14.9844 22.206 14.9844 20.0001C14.9844 17.7941 16.7783 16 18.9843 16C21.1904 16 22.9843 17.7941 22.9843 20.0001C22.9843 22.206 21.1904 24.0001 18.9843 24.0001ZM18.9843 17.5C17.6053 17.5 16.4844 18.6221 16.4844 20.0001C16.4844 21.378 17.6053 22.5001 18.9843 22.5001C20.3633 22.5001 21.4843 21.378 21.4843 20.0001C21.4843 18.6221 20.3633 17.5 18.9843 17.5Z"
                    fill="#7F848C"
                  />
                  <path
                    d="M8.23444 11.9999C8.23444 13.7949 6.7793 15.2499 4.98431 15.2499C3.18951 15.2499 1.73438 13.7949 1.73438 11.9999C1.73438 10.205 3.18951 8.75 4.98431 8.75C6.7793 8.75 8.23444 10.205 8.23444 11.9999Z"
                    fill="#7F848C"
                  />
                  <path
                    d="M4.98431 15.9999C2.77844 15.9999 0.984375 14.206 0.984375 11.9999C0.984375 9.79388 2.77844 8 4.98431 8C7.19037 8 8.98444 9.79388 8.98444 11.9999C8.98444 14.206 7.19037 15.9999 4.98431 15.9999ZM4.98431 9.5C3.60535 9.5 2.48438 10.6219 2.48438 11.9999C2.48438 13.378 3.60535 14.4999 4.98431 14.4999C6.36346 14.4999 7.48444 13.378 7.48444 11.9999C7.48444 10.6219 6.36346 9.5 4.98431 9.5Z"
                    fill="#7F848C"
                  />
                  <path
                    d="M7.3467 11.5198C6.99862 11.5198 6.6606 11.3387 6.47658 11.0148C6.20357 10.5358 6.37166 9.92475 6.85067 9.65065L16.1295 4.36073C16.6085 4.0857 17.2196 4.2538 17.4937 4.73463C17.7667 5.21363 17.5986 5.82466 17.1196 6.09877L7.84054 11.3887C7.68453 11.4777 7.51461 11.5198 7.3467 11.5198Z"
                    fill="#7F848C"
                  />
                  <path
                    d="M16.6236 19.7701C16.4555 19.7701 16.2856 19.728 16.1296 19.639L6.85053 14.3491C6.37153 14.0761 6.20362 13.465 6.47663 12.9849C6.74854 12.505 7.36048 12.336 7.84058 12.611L17.1196 17.9009C17.5986 18.174 17.7665 18.785 17.4935 19.2651C17.3086 19.589 16.9706 19.7701 16.6236 19.7701Z"
                    fill="#7F848C"
                  />
                </svg>
              </button>
              <div class="social_block">
                <social-network
                  class="link bg-background-main shadow_btn_white_active social_active_link"
                ></social-network>
              </div>
            </div>
            <div class="icon shadow_btn_white bg-background-main">
              <button
                class="btn_icon btn_svg"
                @click="burgerToggle"
                :class="{ burger_activ_btn }"
              >
                <svg
                  class="menu"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.4355 1.57812H6.5913C3.8343 1.57812 1.5918 3.82063 1.5918 6.57763V17.4219C1.5918 20.1789 3.8343 22.4214 6.5913 22.4214H17.4355C20.1925 22.4214 22.435 20.1789 22.435 17.4219V6.57837C22.435 3.82137 20.1925 1.57812 17.4355 1.57812ZM6.71205 19.0471C5.72055 19.0471 4.91355 18.2409 4.91355 17.2501C4.91355 16.2594 5.72055 15.4531 6.71205 15.4531C7.7028 15.4531 8.50905 16.2594 8.50905 17.2501C8.50905 18.2409 7.70355 19.0471 6.71205 19.0471ZM6.71205 13.7971C5.72055 13.7971 4.91355 12.9909 4.91355 12.0001C4.91355 11.0094 5.72055 10.2031 6.71205 10.2031C7.7028 10.2031 8.50905 11.0094 8.50905 12.0001C8.50905 12.9909 7.70355 13.7971 6.71205 13.7971ZM6.71205 8.54712C5.72055 8.54712 4.91355 7.74087 4.91355 6.75012C4.91355 5.75938 5.72055 4.95312 6.71205 4.95312C7.7028 4.95312 8.50905 5.75938 8.50905 6.75012C8.50905 7.74087 7.70355 8.54712 6.71205 8.54712ZM18.0978 18.6189H11.8548C11.1273 18.6189 10.5355 18.0091 10.5355 17.2599C10.5355 16.5106 11.1273 15.9016 11.8548 15.9016H18.0978C18.8133 15.9016 19.3945 16.5106 19.3945 17.2599C19.3945 18.0099 18.8133 18.6189 18.0978 18.6189ZM18.0978 13.3689H11.8548C11.1273 13.3689 10.5355 12.7591 10.5355 12.0099C10.5355 11.2606 11.1273 10.6516 11.8548 10.6516H18.0978C18.8133 10.6516 19.3945 11.2606 19.3945 12.0099C19.3945 12.7599 18.8133 13.3689 18.0978 13.3689ZM18.0978 8.11887H11.8548C11.1273 8.11887 10.5355 7.50912 10.5355 6.75987C10.5355 6.01062 11.1273 5.40163 11.8548 5.40163H18.0978C18.8133 5.40163 19.3945 6.01062 19.3945 6.75987C19.3945 7.50987 18.8133 8.11887 18.0978 8.11887Z"
                    fill="#7F848C"
                  />
                </svg>
              </button>

              <div class="burger" :class="{ burger_activ }">
                <vuescroll>
                  <div class="burger_content">
                    <toggle
                      class="burger_toggle"
                      @sunchanged="updatetheme"
                      @darkchanged="themedark"
                    ></toggle>
                    <div class="close" @click="closeBtn">
                      <div class="close_btn">
                        <span class="text-copy-main"></span>
                        <span class="text-copy-main"></span>
                      </div>
                    </div>
                    <div class="burger_menu">
                      <a :href="$t('menuNews')">{{ $t("news") }}</a>
                      <a :href="$t('menuFaq')">FAQ</a>
                      <a :href="$t('menuPosts')">{{ $t("posts") }}</a>
                      <a :href="$t('menuReviews')">{{ $t("reviews") }}</a>
                      <a :href="$t('menuAffiliateProgram')">{{
                          $t("affiliateProgram")
                        }}</a>
                      <a :href="$t('menuStatus')">{{ $t("checkOpSt") }}</a>
                      <a :href="$t('menuAgreement')">{{ $t("agreement") }}</a>
                      <a :href="$t('menuRules')">{{ $t("rules") }}</a>
                      <a :href="$t('menuSecurity')">{{ $t("security") }}</a>
                      <a :href="$t('menuPartners')">{{ $t("partners") }}</a>
                      <a :href="$t('aboutLink')">{{ $t("about") }}</a>
                    </div>
                  </div>
                  <social-network class="burger_social"></social-network>
                </vuescroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <authorization :class="{ show_entrance }"></authorization>
    <password-recovery :class="{ recovery }"></password-recovery>
  </header>
</template>

<script>
import vuescroll from "vuescroll";
import axios from "axios";
import vuex from "vuex";

export default {
  props: {
    openwindiwentrance: {
      openwindiwentrance: Boolean,
    },
    openwindiwpersonalarea: {
      openwindiwpersonalarea: Boolean,
    },
  },
  data: function() {
    return {
      active_personal_area: false,
      appActiveFon: false,
      //Время
      date: new Date(),
      interval: null,
      theme: "theme-light",
      //бургер меню
      burger_activ: false,
      burger_activ_btn: false,
      lang_activ_btn: false,
      lang_activ_block: false,
    };
  },
  components: {
    vuescroll,
  },
  computed: {
    block_russia() {
      return this.$store.getters.block_russia;
    },
    block_greatbritain() {
      return this.$store.getters.block_greatbritain;
    },
    block_ukraine() {
      return this.$store.getters.block_ukraine;
    },
    show_entrance() {
      return this.$store.getters.show_entrance;
    },
    recovery() {
      return this.$store.getters.recovery;
    },
    active_entrance() {
      return this.$store.getters.active_entrance;
    },
    active_registration() {
      return this.$store.getters.active_registration;
    },
    account_active() {
      return this.$store.getters.account_active;
    },
    appActive: function() {
      return {
        appActiveFon: this.appActiveFon,
      };
    },
  },
  mounted() {
    this.loginActive();
    this.theme = localStorage.getItem("theme") || "theme-light";
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  methods: {
    clearHistory() {
      axios
        .get("https://7money.co/site/clear-last-ids")
        .then((response) => {
          let url = document.getElementById("logo").href;
          document.location = url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    entrance() {
      return this.$store.dispatch("entranceShow");
    },
    registration() {
      return this.$store.dispatch("registrationShow");
    },
    loginActive() {
      let login = document.getElementById("login");
      if (login.value > 1) {
        this.active_personal_area = false;
      } else if (login.value > 0) {
        this.active_personal_area = true;
      }
    },
    updatetheme() {
      this.theme = "theme-light";
      const suntheme = (this.theme = "theme-light");
      localStorage.setItem("theme", suntheme);
      this.$emit("sunchanged", suntheme);
    },
    themedark() {
      this.theme = "theme-dark";
      const darktheme = (this.theme = "theme-dark");
      localStorage.setItem("theme", darktheme);
      this.$emit("darkchanged", darktheme);
    },
    burgerToggle() {
      (this.burger_activ = true),
        (this.burger_activ_btn = !this.burger_activ_btn),
        (this.lang_activ_btn = false),
        (this.lang_activ_block = false),
        (this.appActiveFon = true);
    },
    closeBtn() {
      (this.burger_activ = false),
        (this.burger_activ_btn = false),
        (this.appActiveFon = false);
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
