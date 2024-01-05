import React, { forwardRef } from 'react';

const AddComment = forwardRef<HTMLInputElement>(function AddComment(props, ref) {
  return <input placeholder='Añadir comentario...' ref={ref} />;
});

export default AddComment;
