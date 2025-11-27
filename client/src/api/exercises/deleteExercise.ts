import axios, { AxiosError } from 'axios';

import { Response } from '@/types/response';

import { getDeleteExerciseEndpoint } from '@/constants/api';
import { ERROR_TEXT, SUCCESS_TEXT } from '@/constants/messages';

export const deleteExercise = async (id: string): Promise<Response<string>> => {
  try {
    const response = await axios.delete(getDeleteExerciseEndpoint(id), {
      withCredentials: true,
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
