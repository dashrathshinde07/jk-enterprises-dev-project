import axios from "./axiosConfig";

export const getAllCategories = () => axios.get("/categories");
export const getCategoryById = (id) => axios.get(`/categories/${id}`);

export const createCategory = (data) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  formData.append("parent", data.parent);
  return axios.post("/categories", formData);
};

export const updateCategory = (id, data) => {
  const formData = new FormData();
  if (data.image) formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  formData.append("parent", data.parent);
  return axios.put(`/categories/${id}`, formData);
};

export const deleteCategory = (id) => axios.delete(`/categories/${id}`);

// ✅ Add this to fix the import issue
export const archiveCategory = (id) => axios.patch(`/categories/${id}/archive`);
