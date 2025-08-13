import httpClient from './axiosConfig';
import axios from './axiosConfig';

export const getTrendingProducts = () => axios.get('/trending-products');
export const getTrendingProductById = (id) => axios.get(`/trending-products/${id}`);

export const createTrendingProduct = (data) => {
  const formData = new FormData();  

  formData.append('image', data.image);
  formData.append('buttonText_en', data.buttonText_en);
  formData.append('buttonText_mr', data.buttonText_mr);
  formData.append('title_en', data.title_en);
  formData.append('title_mr', data.title_mr);
  formData.append('description_en', data.description_en);
  formData.append('description_mr', data.description_mr);
  formData.append('category_en', data.category_en);
  formData.append('category_mr', data.category_mr);
  formData.append('isFeatured', data.isFeatured);
  formData.append('maxCapacity', data.maxCapacity);

  // return axios.post('/trending-products', formData);
  return httpClient.postFormData('/trending-products', formData);
    
};

export const updateTrendingProduct = (id, data) => {

  console.log("Pradip updateTrendingProduct ",data);  

  const formData = new FormData();
  console.log("Data to update:", data);
  formData.append('image', data?.image);
  formData.append('buttonText_en', data?.buttonText?.en);
  formData.append('buttonText_mr', data?.buttonText?.mr);
  formData.append('title_en', data?.title?.en);
  formData.append('title_mr', data?.title?.mr);
  formData.append('description_en', data?.description?.en);
  formData.append('description_mr', data?.description?.mr);
  formData.append('category_en', data?.category?.en);
  formData.append('category_mr', data?.category?.mr);
  formData.append('isFeatured', data?.isFeatured);
  formData.append('maxCapacity', data?.maxCapacity);

  return httpClient.putFormData(`/trending-products/${id}`, formData);

};

export const deleteTrendingProduct = (id) => axios.delete(`/trending-products/${id}`);
