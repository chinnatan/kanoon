import Product from "@/models/product.model";

export const AddProductDialog = {
  namespaced: true,
  state: () => ({
    loading: false,
    data: {
      name: null,
      price: null,
      quantity: null,
      image: null,
    },
    visible: false,
  }),
  mutations: {
    show(state: { visible: boolean }) {
      state.visible = true;
    },
    dismiss(state: { data: any; visible: boolean }) {
      state.data = {};
      state.visible = false;
    },
    showLoading(state: { loading: boolean }) {
      state.loading = true;
    },
    dismissLoading(state: { loading: boolean }) {
      state.loading = false;
    },
    updatePrice(state: { data: Product }, price: number) {
      state.data.price = price;
    },
    updateQuantity(state: { data: Product }, quantity: number) {
      state.data.quantity = quantity;
    },
  },
  actions: {
    show({ commit }: { commit: any }) {
      commit("show");
    },
    dismiss({ commit }: { commit: any }) {
      commit("dismiss");
    },
    showLoading({ commit }: { commit: any }) {
      commit("showLoading");
    },
    dismissLoading({ commit }: { commit: any }) {
      commit("dismissLoading");
    },
    updatePrice({ commit }: { commit: any }, price: number) {
      commit("updatePrice", price);
    },
    updateQuantity({ commit }: { commit: any }, quantity: number) {
      commit("updateQuantity", quantity);
    },
  },
  getters: {
    data: (state: { data: Product }) => state.data,
    loading: (state: { loading: boolean }) => state.loading,
    visible: (state: { visible: boolean }) => state.visible,
  },
};
