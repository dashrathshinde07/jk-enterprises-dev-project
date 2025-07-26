import axios from "axios";

// Base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// JSON instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// FormData instance (for image uploads, etc.)
const axiosFormDataInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Unified API methods
const httpClient = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config), // 👈 Add this line

  // Special POST/PUT for FormData
  postFormData: (url, formData, config = {}) =>
    axiosFormDataInstance.post(url, formData, config),

  putFormData: (url, formData, config = {}) =>
    axiosFormDataInstance.put(url, formData, config),
};

export default httpClient;
