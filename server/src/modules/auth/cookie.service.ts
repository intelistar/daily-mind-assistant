import { Injectable } from '@nestjs/common';
import { COOKIE_KEYS, COOKIE_OPTIONS } from './constants/cookie.constants';
import { Response } from 'express';

import { UserResponse } from '../../shared/types/base-response';

@Injectable()
export class CookieService {
  setAuthCookies(res: Response, token: string, user: UserResponse) {
    res.cookie(COOKIE_KEYS.TOKEN, token, COOKIE_OPTIONS.TOKEN);
    res.cookie(COOKIE_KEYS.ROLE, user.role, COOKIE_OPTIONS.ROLE);
  }

  clearAuthCookies(res: Response) {
    res.clearCookie(COOKIE_KEYS.TOKEN);
    res.clearCookie(COOKIE_KEYS.ROLE);
  }
}
