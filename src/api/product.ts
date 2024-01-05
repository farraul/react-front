import { Product, ProductCreate } from 'src/models/product';
import axios from 'axios';
import { productsAdapter } from 'src/adapters/productsAdapter';

export const getProductsRequest = async (id: string): Promise<Product[]> => {
  const response = await axios.get(`/user/products/${id}`);

  return productsAdapter(response.data);
};

export const createProductRequest = async (product: ProductCreate) => {
  await axios.post('/user/products', product);
};

export const updateProductRequest = async (product: Product) =>
  axios.put(`/user/product/${product.userId}`, product);

export const deleteProductRequest = async (id: string) =>
  await axios.delete(`/user/products/${id}`);

export const getProductRequest = async (id: string) => axios.get(`/api/product/${id}`);
