import axios, { AxiosError } from 'axios';

import { Exercise } from '@/types/exercise';
import { Response } from '@/types/response';

import { getUpdateExerciseEndpoint } from '@/constants/api';
import { ERROR_TEXT, SUCCESS_TEXT } from '@/constants/messages';

export const updateExercise = async (
  id: string,
  text: string,
): Promise<Response<Exercise>> => {
  try {
    const response = await axios.put(
      getUpdateExerciseEndpoint(id),
      {
        text,
      },
      {
        withCredentials: true,
      },
    );

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
