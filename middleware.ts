import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const { isBot } = userAgent(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-bot", `${isBot}`);
  requestHeaders.set("x-url", request.nextUrl.pathname);

  if (request.nextUrl.pathname.includes(".xml")) {
    console.log(request.nextUrl.pathname);
    const res = await fetch(
      `http://admin.aibetguru.com${request.nextUrl.pathname}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (res.ok) {
      const data = await res.text();
      requestHeaders.set("x-xml", data);
    } else {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  return response;
}
