import { createI18n } from "vue-i18n";

import { en as vuetifyEn, th as vuetifyTh } from "vuetify/locale";

import en from "@/assets/lang/en.json";
import th from "@/assets/lang/th.json";

const messages = {
  en: {
    ...en,
    $vuetify: vuetifyEn,
  },
  th: {
    ...th,
    $vuetify: vuetifyTh,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "th",
  fallbackLocale: "th",
  messages,
});

export default i18n;
