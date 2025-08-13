import httpClient from "./axiosConfig";
import axios from "./axiosConfig";

export const getAllBlogs = () => axios.get("/blogs");
export const getBlogById = (id) => axios.get(`/blogs/${id}`);

export const createBlog = (data) => {
  const formData = new FormData();

  console.log("data ", data);

  // title_en,
  //   title_mr,
  //   description_en,
  //   description_mr,
  //   content_en,
  //   content_mr,
  //   category_en,
  //   category_mr,
  //   authorName,
  formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  formData.append("description_en", data.description_en);
  formData.append("description_mr", data.description_mr);
  formData.append("content_en", data.content_en);
  formData.append("content_mr", data.content_mr);
  formData.append("category_en", data.category_en);
  formData.append("category_mr", data.category_mr);
  formData.append("authorName", data.authorName);
  return httpClient.postFormData("/blogs", formData);
};

export const updateBlog = (id, data) => {
  const formData = new FormData();

  console.log("data ", data);

  formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  formData.append("description_en", data.description_en);
  formData.append("description_mr", data.description_mr);
  formData.append("content_en", data.content_en);
  formData.append("content_mr", data.content_mr);
  formData.append("category_en", data.category_en);
  formData.append("category_mr", data.category_mr);
  formData.append("authorName", data.authorName);

  return httpClient.putFormData(`/blogs/${id}`, formData);
};

export const deleteBlog = (id) => axios.delete(`/blogs/${id}`);