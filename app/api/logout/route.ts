import { NextResponse } from "next/server";

/**
 * GET /api/logout
 *
 * Forces the browser to forget its stored HTTP Basic Auth credentials by
 * returning a 401 with a fresh WWW-Authenticate challenge.
 * After the browser fires this, it clears credentials and any subsequent
 * navigation to /admin will re-prompt for the password.
 */
export function GET() {
  return new NextResponse("Logged out. Please close this tab or navigate away.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Premium Travels Admin", charset="UTF-8"',
      "Content-Type": "text/plain",
    },
  });
}
