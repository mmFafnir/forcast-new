import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const { isBot } = userAgent(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-bot", `${isBot}`);
  requestHeaders.set("x-url", request.nextUrl.pathname);
  console.log("ip", request.ip);
  requestHeaders.set("request-ip", request.ip || "");
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  return response;
}
