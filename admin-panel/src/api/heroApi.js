import httpClient from "./axiosConfig";
import axios from "./axiosConfig";

export const getAllHeroes = () => axios.get("/hero");

export const getHeroById = (id) => axios.get(`/hero/${id}`);

export const createHero = (data) => {

  const formData = new FormData();
  formData.append("image", data.backgroundImageUrl);
  formData.append("headline_en", data.headline_en);
  formData.append("headline_mr", data.headline_mr);
  formData.append("subHeadline_en", data.subHeadline_en);
  formData.append("subHeadline_mr", data.subHeadline_mr);
  formData.append("buttonText_en", data.buttonText_en);
  formData.append("buttonText_mr", data.buttonText_mr);
  formData.append("buttonLink", data.buttonLink);

  return httpClient.post("/hero", formData)
};

export const updateHeroById = (data) => {

  const formData = new FormData();
  formData.append("image", data.backgroundImageUrl);
  formData.append("headline_en", data.headline.en);
  formData.append("headline_mr", data.headline.mr);
  formData.append("subHeadline_en", data.subHeadline.en);
  formData.append("subHeadline_mr", data.subHeadline.mr);
  formData.append("buttonText_en", data.buttonText.en);
  formData.append("buttonText_mr", data.buttonText.mr);
  formData.append("buttonLink", data.buttonLink);
  return httpClient.putFormData(`/hero/${data.id}`, formData);
};

export const deleteHeroById = (id) => axios.delete(`/hero/${id}`);
