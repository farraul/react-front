import { useRef } from 'react';
import Post from 'src/pages/HookImperativeHandlePage/Post';
import React from 'react';

const HookImperativeHandle = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postRef = useRef<any>(null);

  function handleClick() {
    postRef?.current?.scrollAndFocusAddComment();
  }

  return (
    <section className="h-[calc(100vh-64px)] p-16">
      <button className="border-solid border-black border-2 p-3" onClick={handleClick}>
        Clic para escribir un comentario
      </button>
      <Post ref={postRef} />
    </section>
  );
};

export default HookImperativeHandle;
