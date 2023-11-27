export interface SignIn {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUp extends SignIn {
  firstName: string;
}
