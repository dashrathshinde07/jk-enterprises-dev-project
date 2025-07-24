import axios from "./axiosConfig";

export const getAllBlogs = () => axios.get("/blogs");
export const getBlogById = (id) => axios.get(`/blogs/${id}`);

export const createBlog = (data) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  formData.append("description_en", data.description_en);
  formData.append("description_mr", data.description_mr);
  formData.append("category_en", data.category_en);
  formData.append("category_mr", data.category_mr);
  formData.append("authorName", data.authorName);
  formData.append("publishedDate", data.publishedDate);
  return axios.post("/blogs", formData);
};

export const updateBlog = (id, data) => {
  const formData = new FormData();
  if (data.image) formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  formData.append("description_en", data.description_en);
  formData.append("description_mr", data.description_mr);
  formData.append("category_en", data.category_en);
  formData.append("category_mr", data.category_mr);
  formData.append("authorName", data.authorName);
  formData.append("publishedDate", data.publishedDate);
  return axios.put(`/blogs/${id}`, formData);
};

export const deleteBlog = (id) => axios.delete(`/blogs/${id}`);
