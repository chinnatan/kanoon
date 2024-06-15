import { createStore } from "vuex";
import { AddProductDialog } from "./modules/add_product_dialog";

const store = createStore({
  modules: {
    addProductDialog: AddProductDialog,
  },
});

export default store;
