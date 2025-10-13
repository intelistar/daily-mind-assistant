export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface Task {
  id: string;
  text: string;
  status: TaskStatus;
  dateSent: Date;
}

export interface TaskResponse {
  data?: Task;
  success: boolean;
  message: string;
}

export interface TasksResponse {
  data?: Task[];
  success: boolean;
  message: string;
}
