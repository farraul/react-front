import { Product, ProductCreate } from '@/models/product';
import { instance as axios } from '../api/axios';
import { Client } from '@/models/user/client';

export const getClientsRequest = async (id: string): Promise<Client[]> => {
  const response = await axios.get(`/api/user/clients/${id}`);
  return response.data;
};

export const createClientRequest = async (client: ProductCreate) => {
  await axios.post('/api/user/clients', client);
};

export const updateClientRequest = async (product: Product) =>
  axios.put(`/api/user/product/${product.userId}`, product);

// export const deleteClientProductRequest = async (id: string) =>
//   await axios.delete(`/api/user/products/${id}`);

// export const getPRequest = async (id: string) => axios.get(`/api/product/${id}`);
