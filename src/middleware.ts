import { NextRequest, NextResponse } from 'next/server';

const privatePaths = ['/manage'];
const publicPaths = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = Boolean(request.cookies.get('accessToken')?.value);
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (publicPaths.some((path) => path.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/manage/:path', '/login'],
};
