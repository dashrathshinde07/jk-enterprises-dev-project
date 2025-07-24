import axios from './axiosConfig';

export const getTrendingProducts = () => axios.get('/trending-products');
export const getTrendingProductById = (id) => axios.get(`/trending-products/${id}`);

export const createTrendingProduct = (data) => {
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  return axios.post('/trending-products', formData);
};

export const updateTrendingProduct = (id, data) => {
  const formData = new FormData();
  if (data.image) formData.append('image', data.image);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  return axios.put(`/trending-products/${id}`, formData);
};

export const deleteTrendingProduct = (id) => axios.delete(`/trending-products/${id}`);
