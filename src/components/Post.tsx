import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import AddComment from '@/components/AddComment';
import CommentList from '@/components/CommentList';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';

const Post = forwardRef((props, ref) => {
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
