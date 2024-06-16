import NotificationModel from "@/models/notification.model";

export const Snackbar = {
  namespaced: true,
  state: () => ({
    snackbars: [],
  }),
  mutations: {
    addNotification(
      state: { snackbars: NotificationModel[] },
      snackbar: NotificationModel
    ) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
    removeNotification(
      state: { snackbars: NotificationModel[] },
      snackbar: NotificationModel
    ) {
      state.snackbars = state.snackbars.filter((s: NotificationModel) => {
        return s !== snackbar;
      });
    },
  },
  actions: {
    addNotification({ commit }: { commit: any }, snackbar: NotificationModel) {
      snackbar.id = Math.random() + new Date().getTime();
      snackbar.showing = true;
      snackbar.color = snackbar.color || "success";
      snackbar.timeout = snackbar.timeout || 6000;
      commit("addNotification", snackbar);
      setTimeout(() => {
        commit("removeNotification", snackbar);
      }, snackbar.timeout);
    },
    removeNotification(
      { commit }: { commit: any },
      snackbar: NotificationModel
    ) {
      commit("removeNotification", snackbar);
    },
  },
  getters: {
    snackbars: (state: { snackbars: NotificationModel[] }) => state.snackbars,
  },
};

