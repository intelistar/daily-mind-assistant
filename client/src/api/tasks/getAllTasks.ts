import axios, { AxiosError } from 'axios';

import { Response } from '@/types/response';
import { Task } from '@/types/task';

import { GET_ALL_TASKS_ENDPOINT } from '@/constants/api';
import { ERROR_TEXT, SUCCESS_TEXT } from '@/constants/messages';
import { getCookies } from '@/utils/getCookies';

export const getAllTasks = async (): Promise<Response<Task[]>> => {
  try {
    const response = await axios.get(GET_ALL_TASKS_ENDPOINT, {
      headers: {
        ...{ cookie: await getCookies() },
      },
    });

    return {
      success: true,
      data: response.data,
      message: SUCCESS_TEXT,
    };
  } catch (error) {
    console.log(error);
    let message = ERROR_TEXT;

    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      message = err.response?.data?.message || err.message;
    }

    return {
      success: false,
      message,
    };
  }
};
