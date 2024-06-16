import { createStore } from "vuex";
import { AddProductDialog } from "./modules/AddEditProductDialog";
import { UserInfo } from "./modules/UserInfo";
import { Snackbar } from "./modules/Snackbar";

const store = createStore({
  modules: {
    user: UserInfo,
    notification: Snackbar,
    addProductDialog: AddProductDialog,
  },
});

export default store;
