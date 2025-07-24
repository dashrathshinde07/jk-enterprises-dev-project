import axios from './axiosConfig';

export const getAllSectionItems = () => axios.get('/section-item');
export const getSectionItemById = (id) => axios.get(`/section-item/${id}`);

export const createSectionItem = (data) => {
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  return axios.post('/section-item', formData);
};

export const updateSectionItem = (id, data) => {
  const formData = new FormData();
  if (data.image) formData.append('image', data.image);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  return axios.put(`/section-item/${id}`, formData);
};

export const deleteSectionItem = (id) => axios.delete(`/section-item/${id}`);
