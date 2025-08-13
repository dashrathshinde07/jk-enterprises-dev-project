import httpClient from './axiosConfig';
import axios from './axiosConfig';

export const getAllWhyChooseUs = () => axios.get('/why-choose-us');
export const getWhyChooseUsById = (id) => axios.get(`/why-choose-us/${id}`);

export const createWhyChooseUs = (data) => {
  const formData = new FormData();
  formData.append('icon', data.icon);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  formData.append('description_en', data.description_en);
  formData.append('description_mr', data.description_mr);
  
  return httpClient.postFormData('/why-choose-us', formData)
};

export const updateWhyChooseUs = (id, data) => {

  const formData = new FormData();
  if (data.icon) formData.append('icon', data.icon);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  formData.append('description_en', data.description_en);
  formData.append('description_mr', data.description_mr);
  // return axios.put(`/why-choose-us/${id}`, formData);
  return httpClient.putFormData(`/why-choose-us/${id}`, formData);
};

export const deleteWhyChooseUs = (id) => axios.delete(`/why-choose-us/${id}`);
