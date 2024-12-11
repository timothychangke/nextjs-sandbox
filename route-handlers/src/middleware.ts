import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // method 2
  if (request.nextUrl.pathname === 'profile')
    return NextResponse.redirect(new URL('/', request.url));
}

//method 1
export const config = {
  matcher: '/profile',
};

export function cookieMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  const themePreference = request.cookies.get('theme');
  if (!themePreference) {
    response.cookies.set('theme', 'dark');
  }
  response.headers.set('custom-headers', 'custom-value');
  return response;
}
