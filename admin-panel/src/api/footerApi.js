import httpClient from "./axiosConfig";
import axios from "./axiosConfig";

export const getFooter = () => axios.get("/footer");

// export const createFooter = (data) => {

//   console.log(data);  
//   return axios.post("/footer", data);
// };

export const createFooter = (data) => {
  const formData = new FormData();

  formData.append('description_en', data.description.en);
  formData.append('description_mr', data.description.mr);
  formData.append('phone_en', data.contact.phone.en);
  formData.append('phone_mr', data.contact.phone.mr);
  formData.append('address_en', data.contact.address.en);
  formData.append('address_mr', data.contact.address.mr);
  formData.append('facebook', data.socialLinks.facebook);
  formData.append('instagram', data.socialLinks.instagram);
  formData.append('linkedin', data.socialLinks.linkedin);
  formData.append('developedBy', data.developedBy);
  formData.append('logo', data.logoUrl);
  formData.append("links", JSON.stringify(data.links));

  return httpClient.postFormData("/footer", formData);
};

export const updateFooterById = (id, data) => {

  const formData = new FormData();

  formData.append('description_en', data.description.en);
  formData.append('description_mr', data.description.mr);
  formData.append('phone_en', data.contact.phone.en);
  formData.append('phone_mr', data.contact.phone.mr);
  formData.append('address_en', data.contact.address.en);
  formData.append('address_mr', data.contact.address.mr);
  formData.append('facebook', data.socialLinks.facebook);
  formData.append('instagram', data.socialLinks.instagram);
  formData.append('linkedin', data.socialLinks.linkedin);
  formData.append('developedBy', data.developedBy);
  formData.append('logo', data.logoUrl);
  formData.append("links", JSON.stringify(data.links));

  // return axios.put(`/footer/${id}`, data);
  return httpClient.putFormData(`/footer/${id}`, formData);
};

export const deleteFooterById = (id) => axios.delete(`/footer/${id}`);
