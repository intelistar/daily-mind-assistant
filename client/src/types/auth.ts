import { User } from './user';

export interface LoginUser {
  email: string;
  password: string;
}

export interface SignUpUser {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data?: User;
  message: string;
}
