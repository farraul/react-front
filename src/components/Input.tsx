import React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type AttributeProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputGeneric = AttributeProps & { isFocused?: boolean };

const Input = forwardRef(
  (
    {
      type = 'text',
      className = '',
      name,
      value,
      placeholder = '',
      isFocused = false,
      ...props
    }: InputGeneric,
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
      if (isFocused) {
        localRef.current?.focus();
      }
    }, []);
    return (
      <input
        {...props}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={
          'border-gray-600 placeholder-gray-300 dark:border-gray-700 dark:bg-gray-400 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
          className
        }
        ref={localRef}
      />
    );
  },
);

export default Input;
