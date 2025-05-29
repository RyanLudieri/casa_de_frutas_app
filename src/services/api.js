import axios from 'axios';

const API_URL = 'http://localhost:8080/product';

export const getAllProducts = () => axios.get(API_URL);
export const createProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, product) => axios.patch(`${API_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);


// Função nova para busca com filtros
export const searchProducts = ({ name, type, minPrice, maxPrice }) => {
  const params = {};

  if (name && name.trim() !== '') params.name = name.trim();
  if (type && type.trim() !== '') params.type = type.trim();
  if (minPrice !== undefined && minPrice !== '') params.minPrice = minPrice;
  if (maxPrice !== undefined && maxPrice !== '') params.maxPrice = maxPrice;

  return axios.get(`${API_URL}/search`, { params });
};