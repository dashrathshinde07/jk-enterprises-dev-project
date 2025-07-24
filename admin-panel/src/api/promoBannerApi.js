import axios from './axiosConfig';

export const getAllPromoBanners = () => axios.get('/promo-banner/homepage');
export const getPromoBannerById = (id) => axios.get(`/promo-banner/homepage/${id}`);

export const createPromoBanner = (data) => {
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  return axios.post('/promo-banner/homepage', formData);
};

export const updatePromoBanner = (id, data) => {
  const formData = new FormData();
  if (data.image) formData.append('image', data.image);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  return axios.put(`/promo-banner/homepage/${id}`, formData);
};

export const deletePromoBanner = (id) => axios.delete(`/promo-banner/homepage/${id}`);
