import axios from "./axiosConfig";

export const getFooter = () => axios.get("/footer");

export const createFooter = (data) => {
  return axios.post("/footer", data);
};

export const updateFooterById = (id, data) => {
  return axios.put(`/footer/${id}`, data);
};

export const deleteFooterById = (id) => axios.delete(`/footer/${id}`);
