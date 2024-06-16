import i18n from "@/plugins/i18n";
import store from "@/store";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

export const routesPath = {
  login: "/",
  home: "/home",
  product: "/product",
};

const routes: RouteRecordRaw[] = [
  {
    path: routesPath.login,
    name: "login",
    component: () => import("@/pages/Login.vue"),
    meta: { title: i18n.global.t("login"), requiresAuth: false },
  },
  {
    path: routesPath.home,
    name: "home",
    component: () => import("@/pages/Home.vue"),
    meta: { title: i18n.global.t("menuName.home"), requiresAuth: true },
  },
  {
    path: routesPath.product,
    name: "product",
    component: () => import("@/pages//product/Product.vue"),
    meta: { title: i18n.global.t("menuName.product"), requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let userProfile = store.getters["user/info"];

  if (userProfile.id === null) {
    await store.dispatch("user/getUserInfo");
    userProfile = store.getters["user/info"];
  }

  if (to.meta.requiresAuth) {
    if (userProfile.id === null) {
      next({ path: routesPath.login });
    } else {
      next();
    }
  } else {
    if (userProfile.id !== null) {
      next({ path: routesPath.home });
    } else {
      next();
    }
  }
});

router.afterEach((to) => {
  document.title =
    to.meta.title != undefined
      ? to.meta.title + " - " + i18n.global.t("appName")
      : i18n.global.t("appName");
});

export default router;
