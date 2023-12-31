import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from 'src/components/PrimitiveElements/Input';

type Inputs = {
  example?: string;
  exampleRequired: string;
  phone: number;
  lastName: string;
};

const userSchema = object({
  example: string(),
  exampleRequired: string().required(),
  phone: number().required().integer(),
  lastName: string().required(),
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
    <section className='h-[calc(100vh-64px)] p-16 bg-primary text-white'>
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
        <CustomInput
          label='Nombres'
          name='name'
          error={errors.lastName?.message as string}
          register={register}
          rules={{
            required: true,
            maxLength: {
              value: 10,
              message: 'This input exceed maxLength.',
            },
          }}
          type='text'
          id='name'
          isRequired={true}
          placeholder='Nombre'
        />
        <input type='submit' />
      </form>
    </section>
  );
}

export default HookFormPage;
