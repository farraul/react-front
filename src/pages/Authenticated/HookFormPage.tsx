import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Inputs = {
  example?: string;
  exampleRequired: string;
  phone: number;
};

const userSchema = object({
  example: string(),
  exampleRequired: string().required(),
  phone: number().required().integer(),
});

//check more ideas
function HookFormPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(userSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log('data: ', data);

  return (
    <section className='h-[calc(100vh-64px)] p-16 bg-gray-600 text-white'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className='text-black' defaultValue='test' {...register('example')} />
        <br />
        {errors.example && <span>This field is required</span>}
        <br />
        <input className='text-black' {...register('exampleRequired')} />
        <br />
        {errors.exampleRequired && <span>{errors.exampleRequired.message}</span>}
        <br />
        <input type='number' className='text-black' {...register('phone')} />
        <br />
        {errors.phone && <span>{errors.phone.message}</span>}
        <br />
        <input type='submit' />
      </form>
    </section>
  );
}

export default HookFormPage;
