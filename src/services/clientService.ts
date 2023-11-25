import { Client } from 'src/models/user/client';
import axios from 'axios';

export const getClientsRequest = async (id: string): Promise<Client[]> => {
  const response = await axios.get(`/user/clients/${id}`);
  return response.data;
};

export const createClientRequest = async (client: Client) => {
  await axios.post('/user/clients', client);
};

export const updateClientRequest = async (product: Client) => {
  await axios.put('/user/clients', product);
};
export const deleteClientRequest = async (_id: string) => {
  await axios.delete('/user/clients', { data: { _id } });
};
