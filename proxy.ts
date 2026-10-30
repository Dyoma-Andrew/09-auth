import { NextResponse, type NextRequest } from 'next/server';
import { parseSetCookie } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  let isAuthenticated = Boolean(accessToken);
  let refreshedCookies: string[] = [];

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession(request.cookies.toString());
      isAuthenticated = Boolean(sessionResponse.data.success);
      const setCookie = sessionResponse.headers['set-cookie'];
      refreshedCookies = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
    } catch {
      isAuthenticated = false;
    }
  }

  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  let response: NextResponse;
  if (isPrivateRoute && !isAuthenticated) {
    response = NextResponse.redirect(new URL('/sign-in', request.url));
  } else if (isPublicRoute && isAuthenticated) {
    response = NextResponse.redirect(new URL('/', request.url));
  } else {
    response = NextResponse.next();
  }

  for (const cookieString of refreshedCookies) {
    const cookie = parseSetCookie(cookieString);
    if (cookie.value) {
      response.cookies.set(cookie.name, cookie.value, {
        ...(cookie.domain ? { domain: cookie.domain } : {}),
        ...(cookie.expires ? { expires: cookie.expires } : {}),
        ...(cookie.httpOnly !== undefined ? { httpOnly: cookie.httpOnly } : {}),
        ...(cookie.maxAge !== undefined ? { maxAge: cookie.maxAge } : {}),
        ...(cookie.path ? { path: cookie.path } : {}),
        ...(cookie.sameSite !== undefined ? { sameSite: cookie.sameSite } : {}),
        ...(cookie.secure !== undefined ? { secure: cookie.secure } : {}),
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
