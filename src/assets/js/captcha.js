export const Captcha = {
    methods: {
        captcha() {
            let captcha = "6LcIdggUAAAAABRu2Ize9tt04x7hhkHh2KLRgoAf";
            let language = document.getElementById("language");
            if (language.value === "ru") {
                document.querySelector(".g-recaptcha").setAttribute("data-lang", "ru");
            } else {
                document.querySelector(".g-recaptcha").setAttribute("data-lang", "en");
            }
            document
                .querySelector(".g-recaptcha")
                .setAttribute("data-sitekey", captcha);
        },
    },
    mounted() {
        this.captcha();
    }
}