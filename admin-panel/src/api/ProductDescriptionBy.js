
import axios from "./axiosConfig";

export const getProductById = (id) => axios.get(`/api/product-descriptions/${id}`);

