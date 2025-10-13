import axios, { AxiosError } from 'axios';

import { LoginUser } from '@/types/auth';
import { Response } from '@/types/response';
import { User } from '@/types/user';

import { LOGIN_ENDPOINT } from '@/constants/api';
import {
  ERROR_LOGIN_TEXT,
  ERROR_TEXT,
  SUCCESS_LOGIN_TEXT,
} from '@/constants/messages';

export const login = async (user: LoginUser): Promise<Response<User>> => {
  try {
    const response = await axios.post<User>(LOGIN_ENDPOINT, user, {
      withCredentials: true,
    });

    return {
      success: true,
      data: response.data,
      message: SUCCESS_LOGIN_TEXT,
    };
  } catch (error) {
    console.log(error);
    let message = ERROR_TEXT;

    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      message = err.response?.data?.message || err.message || ERROR_LOGIN_TEXT;
    }

    return {
      success: false,
      message,
    };
  }
};
