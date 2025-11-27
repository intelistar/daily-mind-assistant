export const BASE_URL = 'http://localhost:5050';

export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const SIGNUP_ENDPOINT = `${BASE_URL}/auth/register`;
export const LOGOUT_ENDPOINT = `${BASE_URL}/auth/logout`;

export const GET_TODAY_TASK_ENDPOINT = `${BASE_URL}/tasks/today`;
export const GET_ALL_TASKS_ENDPOINT = `${BASE_URL}/tasks`;

export const GET_ALL_EXERCISES_ENDPOINT = `${BASE_URL}/exercises`;
export const CREATE_EXERCISE_ENDPOINT = `${BASE_URL}/exercises`;

export const GET_ALL_USERS_WITH_TASKS_ENDPOINT = `${BASE_URL}/users`;

export const getCompleteTaskEndpoint = (id: string) =>
  `${BASE_URL}/tasks/complete/${id}`;

export const getUpdateExerciseEndpoint = (id: string) =>
  `${BASE_URL}/exercises/${id}`;

export const getDeleteExerciseEndpoint = (id: string) =>
  `${BASE_URL}/exercises/${id}`;
