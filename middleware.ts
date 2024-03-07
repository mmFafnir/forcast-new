import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const { isBot } = userAgent(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-bot", `${isBot}`);
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  return response;
}
