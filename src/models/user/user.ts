import { Product } from '../product';

export interface Token {
  userToken?: string | null;
}

export interface UserInfo extends Token {
  _id: string | null;
  firstName: string | null;
  email: string | null;
  products?: Product[] | null;
}

export interface User extends Token {
  loading?: boolean;
  userInfo?: object | null;
  error?: string | null;
  success?: boolean;
}
