import { ChangeEvent } from 'react';

export type InputChangeEvent<T> =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | (React.ChangeEvent<HTMLTextAreaElement> & {
      target: {
        name: string;
        value: T;
      };
    });
