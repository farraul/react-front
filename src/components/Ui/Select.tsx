import React from 'react';
// Check https://es.react.dev/reference/react/useId

interface SelectProps {
  values: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  name: string;
  placeholder: string;
  options: Record<string, string>;
  className?: string;
}

export const Select = ({
  id,
  name,
  values,
  onChange: onChange,
  placeholder,
  className,
  options,
}: SelectProps) => {
  console.log({ values });
  return (
    <select
      id={id}
      name={name}
      value={values}
      placeholder={placeholder}
      onChange={onChange}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
        className ? className : ''
      }`}
    >
      {Object.entries(options).map(([key, value], index) => (
        <option key={`${key}--${index}`} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
