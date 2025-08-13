import httpClient from './axiosConfig';
import axios from './axiosConfig';

export const getAllPromoBanners = () => axios.get('/promo-banner/homepage');
export const getPromoBannerById = (id) => axios.get(`/promo-banner/homepage/${id}`);

export const createPromoBanner = (data) => {
  const formData = new FormData();

  console.log("Creating promo banner with data:", data);

  formData.append('image', data.image);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  formData.append('subtitle_en', data.subtitle_en);
  formData.append('subtitle_mr', data.subtitle_mr);
  formData.append('tagline_en', data.tagline_en);
  formData.append('tagline_mr', data.tagline_mr);
  formData.append('ctaText_en', data.ctaText_en);
  formData.append('ctaText_mr', data.ctaText_mr);
  formData.append('ctaLink', data.ctaLink);

  return httpClient.postFormData('/promo-banner/homepage', formData);

};

export const updatePromoBanner = (id, data) => {
  const formData = new FormData();

  console.log("Creating promo banner with data:", data);

  formData.append('image', data.image);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  formData.append('subtitle_en', data.subtitle_en);
  formData.append('subtitle_mr', data.subtitle_mr);
  formData.append('tagline_en', data.tagline_en);
  formData.append('tagline_mr', data.tagline_mr);
  formData.append('ctaText_en', data.ctaText_en);
  formData.append('ctaText_mr', data.ctaText_mr);
  formData.append('ctaLink', data.ctaLink);
  // 
  // return axios.put(`/promo-banner/homepage/${id}`, formData);
  return httpClient.putFormData(`/promo-banner/homepage/${id}`, formData);
};

export const deletePromoBanner = (id) => axios.delete(`/promo-banner/homepage/${id}`);
