import axios from "./axiosConfig";

export const getAllReviews = () => axios.get("/reviews");

export const getReviewById = (id) => axios.get(`/reviews/${id}`);

export const createReview = (data) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("name", data.name);
  formData.append("content_en", data.content_en);
  formData.append("content_mr", data.content_mr);
  return axios.post("/reviews", formData);
};

export const updateReview = (id, data) => {
  const formData = new FormData();
  if (data.image) formData.append("image", data.image);
  formData.append("name", data.name);
  formData.append("content_en", data.content_en);
  formData.append("content_mr", data.content_mr);
  return axios.put(`/reviews/${id}`, formData);
};

export const deleteReview = (id) => axios.delete(`/reviews/${id}`);
