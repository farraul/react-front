import React from 'react';

export const Select = ({ values, placeholder, handleChange }) => {
  return (
    <select
      id="brand"
      name="brand"
      value={values.brand}
      placeholder={`${values.brand ? values.brand : 'Type brand'}`}
      onChange={handleChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    >
      <option value="">Select brand</option>
      <option value="apple">Apple</option>
      <option value="microsoft">Microsoft</option>
      <option value="sony">Sony</option>
    </select>
  );
};
