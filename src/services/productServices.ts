import { Product, ProductCreate } from '@/models/product';
import {instance as axios} from '../api/axios';
import { AxiosResponse } from 'axios';

export const getProductsRequest = async (
  id: string,
): Promise<Product[]> => {
  const response = await axios.get(`/api/user/products/${id}`);
  return response.data;
};

export const createProductRequest = async (product: ProductCreate) => {
  const response = await axios.post('/api/user/products', product);
};

export const updateProductRequest = async (product: Product) =>
  axios.put(`/api/product/${product._id}`, product);

export const deleteProductRequest = async (id: string) =>
  await axios.delete(`/api/user/products/${id}`);

export const getProductRequest = async (id: string) =>
  axios.get(`/api/product/${id}`);
