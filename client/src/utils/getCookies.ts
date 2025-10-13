import { cookies } from 'next/headers';

export const getCookies = async () => {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  return cookieHeader;
};
