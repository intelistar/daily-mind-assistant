import axios, { AxiosError } from 'axios';

import { LOGOUT_ENDPOINT } from '@/constants/api';
import {
  ERROR_LOGOUT_TEXT,
  ERROR_TEXT,
  SUCCESS_LOGOUT_TEXT,
} from '@/constants/messages';

export const logout = async () => {
  try {
    await axios.post(
      LOGOUT_ENDPOINT,
      {},
      {
        withCredentials: true,
      },
    );

    return {
      success: true,
      message: SUCCESS_LOGOUT_TEXT,
    };
  } catch (error) {
    console.log(error);
    let message = ERROR_TEXT;

    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      message = err.response?.data?.message || err.message || ERROR_LOGOUT_TEXT;
    }

    return {
      success: false,
      message,
    };
  }
};
