import axios from "./axiosConfig";

export const getAllParentEntities = () => axios.get("/parent-entity");

export const createParentEntity = (data) => {
  return axios.post("/parent-entity", data);
};

export const updateParentEntity = (id, data) => {
  return axios.put(`/parent-entity/${id}`, data);
};

export const deleteParentEntity = (id) => axios.delete(`/parent-entity/${id}`);
