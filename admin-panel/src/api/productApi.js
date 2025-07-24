import axios from "./axiosConfig";

export const getAllProducts = () => axios.get("/products");

export const getProductById = (id) => axios.get(`/products/${id}`);

export const createProduct = (data) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  formData.append("description_en", data.description_en);
  formData.append("description_mr", data.description_mr);
  formData.append("category", data.category);
  return axios.post("/products", formData);
};

export const updateProduct = (id, data) => {
  const formData = new FormData();
  if (data.image) formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  formData.append("description_en", data.description_en);
  formData.append("description_mr", data.description_mr);
  formData.append("category", data.category);
  return axios.put(`/products/${id}`, formData);
};

export const deleteProduct = (id) => axios.delete(`/products/${id}`);

export const softDeleteProduct = (id) =>
  axios.put(`/products/soft-delete/${id}`);
