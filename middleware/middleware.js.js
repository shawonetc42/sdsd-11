// middleware.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token");

  // Forward cookies to the external API
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/profile")) {
    const response = NextResponse.next();
    if (authToken) {
      response.headers.set("Cookie", `auth_token=${authToken}`);
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/profile"],
};
