import { NextResponse, type NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("refreshToken")?.value,
  );
  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPrivateRoute && !hasSession)
    return NextResponse.redirect(new URL("/sign-in", request.url));
  if (isPublicRoute && hasSession)
    return NextResponse.redirect(new URL("/profile", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
