export const COOKIE_KEYS = {
  TOKEN: 'token',
  ROLE: 'role',
};

const DAY_MS = 1000 * 60 * 60 * 24;

export const COOKIE_OPTIONS = {
  TOKEN: {
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: DAY_MS,
  },
  ROLE: {
    httpOnly: false,
    sameSite: 'lax' as const,
    maxAge: DAY_MS,
  },
};
