
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const { pathname } = req.nextUrl;

  const authMiddleware = withAuth({
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async authorized({ token }) {
        if (token) {
          // User is authenticated
          if (pathname.startsWith("/dashboard/merchant") && token.usertype !== "merchant") {
            return false; // Not authorized
          }
          if (pathname.startsWith("/dashboard/customer") && token.usertype !== "customer") {
            return false; // Not authorized
          }
          return true; // Authorized
        }
        return false; // Not authenticated
      },
    },
  });

  // Define redirect URLs for unauthorized access
  if (isAuthenticated) {
    if (pathname.startsWith("/dashboard/merchant") && token?.usertype !== "merchant") {
      return NextResponse.redirect(new URL("/dashboard/customer", req.url));
    }
    if (pathname.startsWith("/dashboard/customer") && token?.usertype !== "customer") {
      return NextResponse.redirect(new URL("/dashboard/merchant", req.url));
    }
  }

  // @ts-ignore
  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
