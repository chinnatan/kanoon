import api from "./axios";

export default {
  login: async (username: string, password: string) => {
    return await api.post("/auth/login", {
      username: username,
      password: password,
    });
  },
  logout: async () => {
    return await api.post("/auth/logout");
  },
  getProducts: async () => {
    return await api.get("/products");
  },
  addProduct: async (product: any) => {
    return await api.post("/products", product);
  },
  updateProduct: async (product: any) => {
    return await api.put(`/products/${product.id}`, product);
  },
  deleteProduct: async (id: number) => {
    return await api.delete(`/products/${id}`);
  },
};
