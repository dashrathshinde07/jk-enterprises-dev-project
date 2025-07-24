import axios from "./axiosConfig";

export const getAllParentEntities = () => axios.get("/parent-entities");

export const createParentEntity = (data) => {
  return axios.post("/parent-entities", data);
};

export const updateParentEntity = (id, data) => {
  return axios.put(`/parent-entities/${id}`, data);
};
export const archiveParentEntity = (id, data) => {
  return axios.put(`/parent-entities/${id}`, data);
};

export const deleteParentEntity = (id) =>
  axios.delete(`/parent-entities/${id}`);
