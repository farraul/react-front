import React, { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  close: () => void;
  isOpen: boolean;
  title: string;
  children: ReactNode;
}

const Modal = ({ close, isOpen, title, children }: ModalProps) => {
  return (
    <>
      <div
        onClick={close}
        className={`${
          isOpen ? '' : 'hidden'
        } cursor-pointer mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-700 opacity-40`}
      ></div>
      <div
        id='productModal'
        className={`${
          isOpen ? 'flex' : 'hidden'
        } mx-auto overflow-y-auto overflow-x-hidden absolute z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full opacity-100`}
      >
        <div className='relative p-4 w-full max-w-2xl max-h-full z-[60]'>
          <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
            <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{title}</h3>
              <button
                type='button'
                onClick={close}
                className='gap-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <IoMdClose className='w-8 h-8' />
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
