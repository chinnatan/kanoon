import service from "@/api/service";
import User from "@/models/user.model";
import router, { routesPath } from "@/router";
import store from "..";
import NotificationModel from "@/models/notification.model";

export const UserInfo = {
  namespaced: true,
  state: () => ({
    loading: false,
    visible: false,
    username: null,
    password: null,
    info: new User(),
  }),
  mutations: {
    passwordVisible(state: { visible: boolean }) {
      state.visible = !state.visible;
    },
    showLoading(state: { loading: boolean }) {
      state.loading = true;
    },
    dismissLoading(state: { loading: boolean }) {
      state.loading = false;
    },
    setUserInfo(state: { info: User }, info: User) {
      state.info = info;
    },
  },
  actions: {
    passwordVisible({ commit }: { commit: any }) {
      commit("passwordVisible");
    },
    showLoading({ commit }: { commit: any }) {
      commit("showLoading");
    },
    dismissLoading({ commit }: { commit: any }) {
      commit("dismissLoading");
    },
    getUserInfo({ commit }: { commit: any }) {
      const user = localStorage.getItem("user");
      if (user) {
        commit("setUserInfo", JSON.parse(user));
      }
    },
    async login(
      { commit }: { commit: any },
      { username, password }: { username: string; password: string }
    ) {
      commit("showLoading");
      const response = await service
        .login(username, password)
        .catch((error) => {
          store.dispatch(
            "notification/addNotification",
            new NotificationModel(error.response.data.result, "white", {
              timeout: 6000,
              icon: "mdi-alert",
            })
          );
          commit("dismissLoading");
        });
      if (response && response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.result));
        commit("setUserInfo", response.data.result);
        router.push(routesPath.home);
      }
      commit("dismissLoading");
    },
    logout({ commit }: { commit: any }) {
      localStorage.removeItem("user");
      commit("setUserInfo", new User());
      router.push(routesPath.login);
    },
  },
  getters: {
    info: (state: { info: User }) => state.info,
    visible: (state: { visible: boolean }) => state.visible,
    username: (state: { username: string }) => state.username,
    password: (state: { password: string }) => state.password,
    loading: (state: { loading: boolean }) => state.loading,
  },
};
