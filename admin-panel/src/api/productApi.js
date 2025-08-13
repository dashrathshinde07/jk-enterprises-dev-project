import httpClient from "./axiosConfig";
import axios from "./axiosConfig";

export const getAllProducts = () => axios.get("/products");

export const getProductById = (id) => axios.get(`/products/${id}`);

export const createProduct = (data) => {
  const formData = new FormData();

  console.log("Proaduct data ", data);

  formData.append("brand", data.brand);
  formData.append("category", data.categoryId);
  formData.append("dimensions", data.dimensions);
  // if (data.image) formData.append("image", data?.images);
  formData.append("logisticsInfo", data.logisticsInfo);
  formData.append("mrp", data.mrp);
  formData.append("nameEn", data.nameEn);
  formData.append("nameMr", data.nameMr);
  // formData.append("productDescription", data.productDescription);
  formData.append("searchableKeywords", data.searchableKeywords);
  formData.append("sellingPrice", data.sellingPrice);
  formData.append("sku", data.sku);
  formData.append("slug", data.slug);
  formData.append("stock", data.stock);
  formData.append("tags", data.tags);
  formData.append("url", data.url);
  formData.append("warranty", data.warranty);
  formData.append("weightCapacity", data.weightCapacity);

  data.images.forEach(img => formData.append("images", img));

  return httpClient.postFormData("/products", formData);
};


export const updateProduct = (id, data) => {
  const formData = new FormData();

  console.log("Rani ", data);

  formData.append("brand", data.brand);
  formData.append("category", data.categoryId);
  formData.append("dimensions", data.dimensions);

  formData.append("logisticsInfo", data.logisticsInfo);
  formData.append("mrp", data.mrp);
  formData.append("nameEn", data.nameEn);
  formData.append("nameMr", data.nameMr);
  // formData.append("productDescription", data.productDescription);
  formData.append("searchableKeywords", data.searchableKeywords);
  formData.append("sellingPrice", data.sellingPrice);
  formData.append("sku", data.sku);
  formData.append("slug", data.slug);
  formData.append("stock", data.stock);
  formData.append("tags", data.tags);
  formData.append("url", data.url);
  formData.append("warranty", data.warranty);
  formData.append("weightCapacity", data.weightCapacity);
  data.images.forEach(img => formData.append("images", img));
  return httpClient.putFormData(`/products/${id}`, formData);
  // return axios.put(`/products/${data?.id}`, formData);
};

export const deleteProduct = (id) => axios.delete(`/products/${id}`);

export const softDeleteProduct = (id) =>
  axios.patch(`/products/archive/${id}`);
