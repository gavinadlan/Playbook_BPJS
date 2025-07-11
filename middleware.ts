import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;

  const protectedRoutes = [
    "/pengajuan-saya",
    "/pengajuan-pks",
    "/admin", 
    "/test-api", 
  ];

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pengajuan-saya/:path*",
    "/pengajuan-pks/:path*",
    "/admin/:path*", 
    "/test-api/:path*", 
  ],
};
