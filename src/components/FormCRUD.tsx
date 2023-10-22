import React, { useState, FormEvent, useEffect } from 'react';
import Input from './Input';
import { IoMdAdd } from 'react-icons/io';
import { InputChangeEvent } from '@/models/form';
import { useAppSelector } from '@/hooks/useApp';
import { VscLoading } from 'react-icons/vsc';
import { Product } from '@/models/product';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const FormCRUD = ({
  handleIsOpen,
  action,
  product,
}: {
  handleIsOpen: () => void;
  action: UseMutationResult<
    void | AxiosResponse<any, any>,
    unknown,
    any,
    // | Product
    // | Partial<Pick<Product, 'userId' | 'title' | 'brand' | 'category' | 'price' | 'description'>>,
    unknown
  >;
  product?: Product;
}) => {
  const [values, setValues] = useState<Product>();

  useEffect(() => {
    if (product) {
      setValues(product);
    }
  }, [product]);

  const { userInfo } = useAppSelector((state) => state.user);

  function handleChange<T>(e: InputChangeEvent<T>) {
    const value = e.target.value as T;
    if (values) setValues({ ...values, [e.target.name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (values) {
      await action.mutateAsync({
        ...values,
        price: `${values?.price}`,
        userId: userInfo?._id as string,
      });
      handleIsOpen();
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <Input
            type="text"
            name="title"
            id="title"
            value={values && values.title}
            placeholder={`${values && values.title ? values.title : 'Name'}`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            value={values && values.brand}
            placeholder={`${values && values.brand ? values.brand : 'Type brand'}`}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">Select brand</option>
            <option value="apple">Apple</option>
            <option value="microsoft">Microsoft</option>
            <option value="sony">Sony</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <Input
            type="number"
            name="price"
            id="price"
            value={values && values.price}
            placeholder={`${values && values.price ? values.price : 'Price'}`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={values && values.category}
            placeholder={`${values && values.category ? values.category : 'Category'}`}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">Select category</option>
            <option value="tv">TV/Monitors</option>
            <option value="pc">PC</option>
            <option value="console">Console</option>
            <option value="phone">Phones</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={values && (values.description as string)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder={`${values && values.description ? values.description : 'Description'}`}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        disabled={action.isLoading}
        className="flex gap-4 items-center justify-center text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2"
      >
        {action.isLoading ? (
          <>
            <VscLoading className="h-5 w-5 animate-spin transition" />
            <h2>Saving...</h2>
          </>
        ) : (
          <>
            <IoMdAdd className="w-6 h-6" />
            <h2>Save Product</h2>
          </>
        )}
      </button>
    </form>
  );
};

export default FormCRUD;
