import React, { useRef, useState } from 'react';
import type { RegisterOptions, UseFormRegister, FieldValues } from 'react-hook-form';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

type AttributeProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type typeInput = 'text' | 'password' | 'number' | 'email' | '';

type Props = {
  id: string;
  label: string;
  name?: string;
  classAditional?: string;
  register: UseFormRegister<any>;
  isRequired?: boolean;
  type: typeInput;
  error: string;
  rules?: RegisterOptions;
} & AttributeProps;

const CustomInput = ({
  label,
  id,
  isRequired,
  classAditional,
  type,
  name,
  placeholder,
  rules,
  error,
  register,
  ...props
}: Props) => {
  const [currentType, setCurrentType] = useState<typeInput>(type);

  const handlePassword = () => {
    const typeIn = currentType === 'password' ? 'text' : 'password';
    setCurrentType(typeIn);
  };

  return (
    <div className={`${classAditional || ''} flex flex-col w-full`}>
      <label className='label-primary' htmlFor={id}>
        {label}
        {isRequired && <b className='text-red-500 '>*</b>}
      </label>
      <div className='relative w-full'>
        <input
          id={id}
          required={isRequired}
          type={currentType}
          className={`${
            id === 'password' || id === 'confirmPassword' ? 'pr-10' : 'pr-4'
          } custom-input`}
          {...(register && register(name as string, rules))}
          {...props}
        />

        {id === 'password' || id === 'confirmPassword' ? (
          <button
            type='button'
            className='absolute top-1 hover:scale-110 transition-all active:scale-95  right-3 text-lg'
            onClick={handlePassword}
          >
            {currentType === type ? <FaEye /> : <FaEyeSlash />}
          </button>
        ) : null}
      </div>
      {error && <p className='mt-1 ml-1 text-xs text-red-500 self-start '>{error}</p>}
    </div>
  );
};

export default CustomInput;
