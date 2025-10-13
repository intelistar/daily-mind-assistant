import { UserRole } from 'generated/prisma';

export interface RequestUser {
  id: string;
  email: string;
  role: UserRole;
}
