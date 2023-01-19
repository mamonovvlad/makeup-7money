import { createI18n } from "vue-i18n/index";

const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "en",
  messages: {
    ru: {
      areYouSure: "Вы уверены?",
      maximumAmount: "Максимальная сумма получения",
      questionInfo:
        "Для сохранения ваших операций, авторизуйтесь в личном кабинете клиента.Также регистрация упростит создание заявок, вы сможете заранее ввести Ваши реквизиты для автозаполнения и создания заявки.",
      yes: "Да",
      no: "Нет",
      cancelOperation: "Отменить операцию",
      working: "Сейчас мы работаем",
      notWorking: "Сейчас мы не работаем",
      preloader: "Идет создание заявки",
      updated: "Обновлено",
      save: "Сохранить",
      direction: "Направление",
      city: "Город",
      amount: "Сумма",
      logIn: "Вход",
      signUp: "Регистрация",
      logout: "Выход",
      password: "Пароль",
      name: "Имя",
      email: "Email",
      confirmPassword: "Подтвердите Пароль",
      referralLink: "Ссылка на ID реферала",
      personalAccount: "Личный Кабинет",
      checkOpSt: "Проверить статус операции",
      schedule: "График работы:",
      workingHours: "Ежедневно, 09:00 - 00:00",
      time: "Время на сайте",
      news: "Новости",
      posts: "Статьи",
      affiliateProgram: "Партнерская программа",
      reviews: "Отзывы",
      agreement: "Соглашение",
      rules: "Правила",
      security: "Безопасность",
      remind: "Забыли пароль?",
      footerText:
        "Лучший онлайн сервис обмена электронных и криптовалют 7money.co © 2016-2023",
      passwordRecovery: "Восстановление пароля",
      send: "Отправить",
      recoveryText:
        "Пожалуйста, заполните Вашу электронную почту. Ссылка для сброса пароля будет отправлена туда.",
      dataInput: "Ввод данных",
      payment: "Оплата",
      completion: "Завершение",
      lacks: "Не хватает?",
      partners: "Партнеры",
      showMore: "Показать еще",
      hide: "Скрыть",
      nameKursExpert: "КурсЭксперт",
      about: "О нас",
      theGive: "Отдаю",
      theGet: "Получаю",
      currencyReserves: "Резервы валют",
      course: "Курс",
      reserves: "Резервы",
      copied: "Скопировано",
      //TheCounter
      days: "Дней",
      hours: "Часов",
      minutes: "Минут",
      seconds: "Секунд",
      endContest: "Осталось до окончания конкурса",
      startContest: "Конкурс еще не начался",
      //TheDiscount
      getDiscount: "Учитывать скидку в сумме “Я ПОЛУЧАЮ”",
      giveDiscount: "Учитывать скидку в сумме “Я ОТДАЮ”",
      //ThePaymentCounter
      timePayment: "Осталось времени на оплату",
      //TheShareSocialNetworks
      shareSocialNetworks: "Поделиться с друзяьми в соц сетях:",
      //TheErrorButtons
      register: "Зарегистрироваться",
      return: "Вернуться на главную",
      //TheLacksWindow
      lacksLabel: "Сумма которой не хватает:",
      lacksWindow_first:
        "Если текущая сумма резерва меньше, чем Вам нужно, то оставьте желаемое значение и Ваш электронный адрес и мы сообщим, когда будем иметь нужную сумму.",
      lacksWindow_second:
        "В том случае, если Вы получили уведомление, но до Вашего визита резерв вновь уменьшился, то разместите заявку, пожалуйста снова.",
      lacksWindow_third: "Спасибо за выбор нашего сервиса!",
      //TheLeaveFeedback
      leaveFeedback: "Оставить отзыв",
      //TheTimeProcessing
      timeProcessing:
        "Ваша заявка будет оплачена автоматически в порядке очереди, от 5 до 30-ти минут",
      //TheCheckStatus
      checkOperation: "Проверить статус операции",
      transaction: "Номер операции",
      check: "Проверить",
      //link
      passwordRecoveryAction: "/auth/request-password-reset",
      entranceAction: "/auth/login",
      registrationAction: "/auth/signup",
      logoutAction: "/auth/logout",
      personalAccountLink: "/profile",
      aboutLink: "/page/aboutus",
      menuPosts: "/blog",
      menuNews: "/news",
      menuFaq: "/page/faq",
      menuReviews: "/reviews",
      menuAffiliateProgram: "/page/affiliate-program",
      menuStatus: "/order/status",
      menuAgreement: "/page/agreement",
      menuRules: "/page/rules",
      menuSecurity: "/page/security",
      menuPartners: "/page/partners",
      linkLogo: "/",
      checkStatus: "/order/status",
      footerLink: "https://www.bestchange.ru/7money-exchanger.html",
    },
    ua: {
      areYouSure: "Ви впевнені?",
      maximumAmount: "Максимальна сума отримання",
      questionInfo:
        "Для збереження ваших операцій, авторизуйтесь в особистому кабінеті клієнта. Також реєстрація спростить створення заявок, ви зможете заздалегідь ввести ваші реквізити для автозаповнення та створення заявки.",
      yes: "Так",
      no: "Ні",
      cancelOperation: "Скасувати операцію",
      working: "Зараз ми працюємо",
      notWorking: "Зараз ми не працюємо",
      preloader: "Йде створення заявки",
      updated: "Оновлено",
      save: "Зберегти",
      direction: "Напрям",
      city: "Город",
      amount: "Сума",
      logIn: "Вхід",
      signUp: "Реєстрація",
      logout: "Вихід",
      password: "Пароль",
      name: "Ім'я",
      email: "Email",
      confirmPassword: "Підтвердіть пароль",
      referralLink: "Посилання на ID реферала",
      personalAccount: "Особистий кабінет",
      checkOpSt: "Перевірити статус операції",
      schedule: "Графік роботи:",
      affiliateProgram: "Партнерська програма",
      workingHours: "Щодня, 09:00 - 00:00",
      time: "Час на сайті",
      news: "Новини",
      posts: "Статті",
      reviews: "Відгуки",
      agreement: "Угода",
      rules: "Правила",
      security: "Безпека",
      remind: "Забули пароль?",
      footerText:
        "Кращий онлайн сервіс обміну електронних і криптовалюта 7money.co © 2016-2023",
      passwordRecovery: "Відновлення паролю",
      send: "Відправити",
      recoveryText:
        "Будь ласка, заповніть Вашу електронну пошту. Посилання для скидання пароля буде вислано Вам туди.",
      dataInput: "Ввід данних",
      payment: "Оплата",
      completion: "Завершення",
      lacks: "Не вистачає?",
      partners: "Партнери",
      showMore: "Показати ще",
      hide: "Заховати",
      nameKursExpert: "КурсЭксперт",
      about: "Про нас",
      theGive: "Віддаю",
      theGet: "Отримую",
      currencyReserves: "Резерви валют",
      course: "Курс",
      reserves: "Резерв",
      copied: "Скопійовано",
      //TheCounter
      days: "Днів",
      hours: "Годин",
      minutes: "Хвилин",
      seconds: "Секунд",
      endContest: "Залишилось до закінчення конкурсу",
      startContest: "Конкурс ще не розпочався",
      //TheDiscount
      getDiscount: "Враховувати знижку в сумі “Я ОТРИМУЮ”",
      giveDiscount: "Враховувати знижку в сумі “Я ВІДДАЮ”",
      //ThePaymentCounter
      timePayment: "Залишилося часу на оплату",
      //TheShareSocialNetworks
      shareSocialNetworks: "Поділитися з друзями в соціальних мережах:",
      //TheErrorButtons
      register: "Зареєструватися",
      return: "Повернутися на головну",
      //TheLacksWindow
      lacksLabel: "Сума якої не вистачає:",
      lacksWindow_first:
        "Якщо поточна сума резерву менше, ніж Вам потрібно, то залиште бажане значення і Вашу електронну адресу і ми повідомимо, коли будемо мати потрібну суму.",
      lacksWindow_second:
        "У тому випадку, якщо Ви отримали повідомлення, але до Вашого візиту резерв знову зменшився, то розмістіть заявку, будь ласка знову.",
      lacksWindow_third: "Дякуємо за вибір нашого сервісу!",
      //TheLeaveFeedback
      leaveFeedback: "Залишити відгук",
      //TheTimeProcessing
      timeProcessing:
        "Ваша заявка буде оплачена автоматично в порядку черги, від 5 до 30-ти хвилин",
      //TheCheckStatus
      checkOperation: "Перевірити статус операції",
      transaction: "Номер операції",
      check: "Перевірити",
      //link
      passwordRecoveryAction: "/ua/auth/request-password-reset",
      entranceAction: "/ua/auth/login",
      registrationAction: "/ua/auth/signup",
      logoutAction: "/ua/auth/logout",
      personalAccountLink: "/ua/profile",
      aboutLink: "/ua/page/aboutus",
      menuPosts: "/ua/blog",
      menuNews: "/ua/news",
      menuFaq: "/ua/page/faq",
      menuReviews: "/ua/reviews",
      menuAffiliateProgram: "/ua/page/affiliate-program",
      menuStatus: "/ua/order/status",
      menuAgreement: "/ua/page/agreement",
      menuRules: "/ua/page/rules",
      menuSecurity: "/ua/page/security",
      menuPartners: "/ua/page/partners",
      linkLogo: "/ua",
      checkStatus: "/ua/order/status",
      footerLink: "https://www.bestchange.ru/7money-exchanger.html",
    },
    en: {
      areYouSure: "Are you sure?",
      maximumAmount: "Maximum amount received",
      questionInfo:
        "To save your transactions, log in to the client's personal account. Also, registration will simplify the creation of applications, you will be able to enter your details for autofill and creating an application.",
      yes: "Yes",
      no: "No",
      cancelOperation: "Cancel the operation",
      working: "Now we are working",
      notWorking: "We are not working now",
      preloader: "Request creation in progress",
      updated: "Updated",
      save: "Save",
      direction: "Direction",
      city: "City",
      amount: "Amount",
      logIn: "Log in",
      signUp: "Sign up",
      logout: "Logout",
      password: "Password",
      name: "Name",
      email: "Email",
      confirmPassword: "Confirm password",
      referralLink: "Link or referral ID",
      personalAccount: "Personal account",
      checkOpSt: "Check operation status",
      schedule: "Schedule:",
      affiliateProgram: "Affiliate Program",
      workingHours: "Every day, 09:00 - 00:00",
      time: "Time on site",
      news: "News",
      reviews: "Reviews",
      posts: "Posts",
      agreement: "Agreement",
      rules: "Rules",
      security: "Security",
      remind: "Remind?",
      footerText:
        "The best online exchange service for electronic and cryptocurrencies 7money.co © 2016-2023",
      passwordRecovery: "Password recovery",
      send: "Send",
      recoveryText:
        "Please fill in your e-mail. The link for password reset will be sent there.",
      dataInput: "Data input",
      payment: "Payment",
      completion: "Completion",
      lacks: "Not enough?",
      partners: "Partners",
      showMore: "Show more",
      hide: "Hide",
      nameKursExpert: "KursExpert",
      about: "About us",
      theGive: "I give",
      theGet: "I get",
      currencyReserves: "Currency reserves",
      course: "Course",
      reserves: "Reserves",
      copied: "Copied",
      //TheCounter
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      endContest: "Remaining until the end of the competition",
      startContest: "Contest hasn't started yet",
      //TheDiscount
      getDiscount: "Consider discount in sum “I GET”",
      giveDiscount: "Consider discount in sum “I GIVE”",
      //ThePaymentCounter
      timePayment: "Time left for payment",
      //TheShareSocialNetworks
      shareSocialNetworks: "Share with friends on social networks",
      //TheErrorButtons
      register: "Register now",
      return: "Go back to the main page",
      //TheLacksWindow
      lacksLabel: "The amount that is missing:",
      lacksWindow_first:
        "If the current reserve amount is lesser than you need, leave the desired sum and your email address and we will inform you about appearance of the given sum.",
      lacksWindow_second:
        "If you received a notification, but the reserve was reduced before your visit, please place your request again.",
      lacksWindow_third: "Thank you for choosing our service!",
      //TheLeaveFeedback
      leaveFeedback: "Leave feedback",
      //TheTimeProcessing
      timeProcessing:
        "Your order will be paid automatically according to the queue from 5 to 30 minutes",
      //TheCheckStatus
      checkOperation: "Check the status of the operation",
      transaction: "Number of transaction",
      check: "check",
      //link
      passwordRecoveryAction: "/en/auth/request-password-reset",
      entranceAction: "/en/auth/login",
      registrationAction: "/en/auth/signup",
      logoutAction: "/en/auth/logout",
      personalAccountLink: "/en/profile",
      aboutLink: "/en/page/aboutus",
      menuNews: "/en/news",
      menuPosts: "/en/blog",
      menuFaq: "/en/page/faq",
      menuReviews: "/en/reviews",
      menuAffiliateProgram: "/en/page/affiliate-program",
      menuStatus: "/en/order/status",
      menuAgreement: "/en/page/agreement",
      menuRules: "/en/page/rules",
      menuSecurity: "/en/page/security",
      menuPartners: "/en/page/partners",
      linkLogo: "/en",
      checkStatus: "/en/order/status",
      footerLink: "https://www.bestchange.com/7money-exchanger.html",
    },
  },
});
export default i18n;
