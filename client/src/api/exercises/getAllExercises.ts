import axios, { AxiosError } from 'axios';

import { Exercise } from '@/types/exercise';
import { Response } from '@/types/response';

import { GET_ALL_EXERCISES_ENDPOINT } from '@/constants/api';
import { ERROR_TEXT, SUCCESS_TEXT } from '@/constants/messages';
import { getCookies } from '@/utils/getCookies';

export const getAllExercises = async (): Promise<Response<Exercise[]>> => {
  try {
    const response = await axios.get(GET_ALL_EXERCISES_ENDPOINT, {
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
