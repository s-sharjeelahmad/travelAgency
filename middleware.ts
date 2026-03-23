import { NextRequest, NextResponse } from "next/server";

/**
 * Edge-compatible HTTP Basic Auth middleware protecting all /admin routes.
 *
 * Pulls credentials from Vercel Environment Variables.
 * If unset locally, falls back to "admin" / "travel2026" for ease of development.
 */
const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "travel2026";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    // Header format: "Basic <base64(user:pass)>"
    const [scheme, encoded] = authHeader.split(" ");

    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const [user, pass] = decoded.split(":");

      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        return NextResponse.next();
      }
    }
  }

  // Missing or wrong credentials — challenge the browser
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Premium Travels Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  // Match any path under /admin or /api/admin
  matcher: ["/admin/:path*", "/admin", "/api/admin/:path*", "/api/admin"],
};
