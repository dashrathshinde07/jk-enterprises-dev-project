import axios from "./axiosConfig";

export const getAllHeroes = () => axios.get("/hero");

export const getHeroById = (id) => axios.get(`/hero/${id}`);

export const createHero = (data) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  return axios.post("/hero", formData);
};

export const updateHeroById = (id, data) => {
  const formData = new FormData();
  if (data.image) formData.append("image", data.image);
  formData.append("title_en", data.title_en);
  formData.append("title_mr", data.title_mr);
  return axios.put(`/hero/${id}`, formData);
};

export const deleteHeroById = (id) => axios.delete(`/hero/${id}`);
