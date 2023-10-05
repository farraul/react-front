import { Product } from '../product';

export interface Token {
  userToken: string;
}

export interface UserInfo extends Token {
  _id: string;
  firstName: string;
  email: string;
  products?: Product[];
}

export interface User {
  loading?: boolean;
  userInfo: UserInfo;
  error?: string | null;
  success?: boolean;
}
