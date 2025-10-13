import { Task } from './task';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface UserWithTasks extends User {
  tasks: Task[];
}
