import { error } from 'console';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
  phone: number;
};

function Times() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log('data: ', data);

  console.log(watch('example'));
  console.log(watch('exampleRequired'));

  return (
    <section className="h-[calc(100vh-64px)] p-16 bg-gray-600 text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-black"
          defaultValue="test"
          {...register('example', { pattern: /^[A-Za-z]+$/i })}
        />
        <br />
        {errors.example && <span>This field is required</span>}
        <br />
        <input
          className="text-black"
          {...register('exampleRequired', { required: 'Este campo es requerido' })}
        />
        <br />
        {errors.exampleRequired && <span>{errors.exampleRequired.message}</span>}
        <br />
        <input
          type="number"
          className="text-black"
          {...register('phone', { required: true, min: 5, max: 10 })}
        />
        <br />
        {errors.phone && <span>This field is required</span>}
        <br />
        <input type="submit" />
      </form>
    </section>
  );
}

export default Times;
