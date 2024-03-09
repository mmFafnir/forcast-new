import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const { isBot } = userAgent(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-bot", `${isBot}`);
  requestHeaders.set("x-url", request.nextUrl.pathname);

  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname.includes(".xml")) {
    try {
      const res = await fetch(`http://admin.aibetguru.com/sitemap.xml`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.text();
        requestHeaders.set("x-xml", data);
      } else {
        console.log("Ошибка HTTP: " + res.status);
      }
    } catch (error) {
      console.log(error);
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
