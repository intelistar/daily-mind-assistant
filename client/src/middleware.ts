import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTES } from './constants/routes';
import { UserRole } from './types/user';

// const protectedRoutes = [ROUTES.profile, ROUTES.admin];
const publicRoutes = [ROUTES.login, ROUTES.signup];
const adminRoutes = [ROUTES.admin_users, ROUTES.admin_exercises];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);

  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(ROUTES.login, req.nextUrl));
  }
  if (isAdminRoute && role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL(ROUTES.profile, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
