export const CurrencyModel = {
  QIWI_ID: 11,
  YANDEX_MONEY_ID: 9,

  PRIVAT_BANK_ID: 3,
  MONO_BANK_ID: 35,
  VISA_MC_UAH_ID: 26,

  BANK_IDS: [3, 5, 13, 14, 15, 16, 17, 18, 26, 35, 43, 44, 45],
  RUB_BANK_IDS: [13, 14, 15, 16, 17, 18],
  UAH_BANK_IDS: [3, 5, 26, 35, 43, 44, 45],
  CRYPT_IDS: [4, 10, 19, 20, 21, 22, 25, 28, 39, 42, 46, 49],
  CASH_IDS: [30, 31, 32, 33, 36, 37, 48, 54, 55, 56],
  VERIFY_IDS: [3, 26, 35],

  isBank(id) {
    return this.BANK_IDS.includes(id);
  },

  isRubBank(id) {
    return this.RUB_BANK_IDS.includes(id);
  },

  isUahBank(id) {
    return this.UAH_BANK_IDS.includes(id);
  },

  isCrypt(id) {
    return this.CRYPT_IDS.includes(id);
  },

  isCash(id) {
    return this.CASH_IDS.includes(id);
  },

  isVerify(id) {
    return this.VERIFY_IDS.includes(id);
  },
};
