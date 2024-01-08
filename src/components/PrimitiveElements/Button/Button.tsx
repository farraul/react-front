import React from 'react';
import { ButtonHTMLAttributes } from 'react';

export default function Button({
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-200 focus:bg-gray-700 dark:focus:bg-gray-200 active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none  transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
