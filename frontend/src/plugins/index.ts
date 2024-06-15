/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import router from "../router";
import i18n from "@/plugins/i18n";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(router).use(i18n).use(vuetify);
}
