import { UserRole } from '@prisma/client';

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user: UserResponse;
}
