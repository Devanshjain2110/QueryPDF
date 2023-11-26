import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = isAuthenticated();
  if (!isAuthenticated()) {
    const pathname = req.nextUrl.pathname; // relative pathname

    const isApiRoute = req.nextUrl.pathname.startsWith("/api");
    const unprotectedRoutes = ["/api/auth/login", "/api/auth/register", "/"];

    if (!isAuth && !unprotectedRoutes.includes(pathname) && !isApiRoute) {
      return NextResponse.redirect(new URL(`/api/auth/login`, req.url));
    }
  }
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth-callback",
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};