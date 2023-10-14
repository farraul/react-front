import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Product, ProductCreate } from '@/models/product';
import Input from './Input';
import { IoMdAdd } from 'react-icons/io';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProductRequest } from '@/services';
import { InputChangeEvent } from '@/models/form';
import { useAppSelector } from '@/hooks/useApp';
import { VscLoading } from 'react-icons/vsc';

const product: ProductCreate = {};

const FormCRUD = ({ handleIsOpen }: { handleIsOpen: () => void }) => {
  const [values, setValues] = useState(product);
  const queryClient = useQueryClient();
  const { userInfo } = useAppSelector((state) => state.user);

  const addProductMutation = useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  function handleChange<T>(e: InputChangeEvent<T>) {
    const value = e.target.value as T;
    setValues({ ...values, [e.target.name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (values) {
      await addProductMutation.mutateAsync({
        ...values,
        price: `$${values.price}`,
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
            value={values.title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type product name"
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
            defaultValue={values.brand}
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
            value={values.price}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="2999"
            onChange={handleChange}
            required
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
            defaultValue={values.category}
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
            value={values.description as string}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Write product description here"
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        disabled={addProductMutation.isLoading}
        className="flex gap-4 items-center justify-center text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2"
      >
        {addProductMutation.isLoading ? (
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
