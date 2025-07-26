// src/api/categoryApi.js

import httpClient from "./axiosConfig";

// Create category (with image)
export const createCategory = (formData) =>
  httpClient.postFormData("/categories", formData);

// Get all categories
export const getAllCategories = () => httpClient.get("/categories");

// Delete a category
export const deleteCategory = (id) => httpClient.delete(`/categories/${id}`);

// Update category
export const updateCategory = (id, formData) =>
  httpClient.putFormData(`/categories/${id}`, formData);
export const archiveCategory = (id) =>
  httpClient.patch(`/categories/${id}/archive`);