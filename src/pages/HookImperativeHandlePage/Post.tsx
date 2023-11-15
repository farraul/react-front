import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import AddComment from 'src/pages/HookImperativeHandlePage/AddComment';
import CommentList from 'src/pages/HookImperativeHandlePage/CommentList';

// eslint-disable-next-line react/display-name
const Post = forwardRef((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commentsRef = useRef<any>(null);
  const addCommentRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollAndFocusAddComment() {
          commentsRef?.current?.scrollToBottom();
          addCommentRef?.current?.focus();
        },
      };
    },
    [],
  );

  return (
    <>
      <article>
        <p>¡Bienvenidos a mi blog!</p>
      </article>
      <CommentList ref={commentsRef} />
      <AddComment ref={addCommentRef} />
    </>
  );
});

export default Post;
