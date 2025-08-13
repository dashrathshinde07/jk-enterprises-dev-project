// src/api/categoryApi.js

import httpClient from "./axiosConfig";

// Create category (with image)
export const createCategory = (data) => {

  const formData = new FormData();

  formData.append("enDescription", data.enDescription)
  formData.append("englishTitle", data.englishTitle)
  formData.append("image", data.image)
  formData.append("isFeatured", data.isFeatured)
  formData.append("marathiTitle", data.marathiTitle)
  formData.append("mrDescription", data.mrDescription)
  formData.append("order", data.order),
    formData.append("parentEntity", data.parentEntity)
  formData.append("slug", data.slug)
  formData.append("status", data.status)

  return httpClient.postFormData("/categories", formData);

}
// Get all categories
export const getAllCategories = () => httpClient.get("/categories");

// Delete a category
export const deleteCategory = (id) => httpClient.delete(`/categories/${id}`);

// Update category
export const updateCategory = (id, formData) => {
  console.log(id, formData);

  httpClient.putFormData(`/categories/${id}`, formData);
}
export const archiveCategory = (id) =>
  httpClient.patch(`/categories/${id}/archive`);