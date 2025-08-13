import httpClient from "./axiosConfig";
import axios from "./axiosConfig";

export const getAllReviews = () => axios.get("/reviews");

export const getReviewById = (id) => axios.get(`/reviews/${id}`);

export const createReview = (data) => {

  const formData = new FormData();
  formData.append("profileImage", data.file);
  formData.append("name", data.name);
  formData.append("rating", data.rating);
  formData.append("reviewDate", data.reviewDate);
  formData.append("reviewText_en", data.reviewText_en);
  formData.append("reviewText_mr", data.reviewText_mr);
  return httpClient.postFormData("/reviews", formData);
};

export const updateReview = (id, data) => {
  const formData = new FormData();
  formData.append("profileImage", data.profileImage);
  formData.append("name", data.name);
  formData.append("rating", data.rating);
  formData.append("reviewDate", data.reviewDate);
  formData.append("reviewText_en", data.reviewText?.en);
  formData.append("reviewText_mr", data.reviewText?.mr);

  return httpClient.putFormData(`/reviews/${id}`, formData);
};

export const deleteReview = (id) => axios.delete(`/reviews/${id}`);
