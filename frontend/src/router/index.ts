import i18n from "@/plugins/i18n";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    component: () => import("@/pages/Login.vue"),
    meta: { title: i18n.global.t("login"), requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title =
    to.meta.title != undefined
      ? to.meta.title + " - " + i18n.global.t("appName")
      : i18n.global.t("appName");
});

export default router;
