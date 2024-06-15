import { createI18n } from "vue-i18n";

import en from "@/assets/lang/en.json";
import th from "@/assets/lang/th.json";

const messages = {
  en: en,
  th: th,
};

const i18n = createI18n({
  legacy: false,
  locale: "th",
  fallbackLocale: "th",
  messages,
});

export default i18n;
