import axios, { AxiosError } from 'axios';

import { SignUpUser } from '@/types/auth';
import { Response } from '@/types/response';
import { User } from '@/types/user';

import { SIGNUP_ENDPOINT } from '@/constants/api';
import {
  ERROR_SIGNUP_TEXT,
  ERROR_TEXT,
  SUCCESS_SIGNUP_TEXT,
} from '@/constants/messages';

export const signUp = async (user: SignUpUser): Promise<Response<User>> => {
  try {
    const response = await axios.post<User>(SIGNUP_ENDPOINT, user, {
      withCredentials: true,
    });

    return {
      success: true,
      data: response.data,
      message: SUCCESS_SIGNUP_TEXT,
    };
  } catch (error) {
    console.log(error);
    let message = ERROR_TEXT;

    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      message = err.response?.data?.message || err.message || ERROR_SIGNUP_TEXT;
    }

    return {
      success: false,
      message,
    };
  }
};
