import { instance as axios } from '../api/axios';
import { Client } from '@/models/user/client';

export const getClientsRequest = async (id: string): Promise<Client[]> => {
  const response = await axios.get(`/api/user/clients/${id}`);
  return response.data;
};

export const createClientRequest = async (client: Client) => {
  await axios.post('/api/user/clients', client);
};

export const updateClientRequest = async (product: Client) => {
  axios.put(`/api/user/clients`, product);
};
export const deleteClientRequest = async (id: Client) => {
  await axios.delete(`/api/user/clients`, id);
};

// export const getPRequest = async (id: string) => axios.get(`/api/product/${id}`);
