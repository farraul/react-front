import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  console.log('in utils');
  return twMerge(clsx(inputs));
}
