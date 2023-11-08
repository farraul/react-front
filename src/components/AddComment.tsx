import { forwardRef, useRef, useImperativeHandle } from 'react';

const AddComment = forwardRef(function AddComment(props, ref) {
  return <input placeholder="Añadir comentario..." ref={ref} />;
});

export default AddComment;
