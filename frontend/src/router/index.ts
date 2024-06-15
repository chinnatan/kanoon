import i18n from "@/plugins/i18n";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    component: () => import("@/pages/Login.vue"),
    meta: { title: i18n.global.t("login"), requiresAuth: false },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home.vue"),
    meta: { title: i18n.global.t("menuName.home"), requiresAuth: true },
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/pages//product/Product.vue"),
    meta: { title: i18n.global.t("menuName.product"), requiresAuth: true },
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
