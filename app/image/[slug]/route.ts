import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getBase64 } from "../../api/image/getBase64";

export async function GET(request: NextRequest, response: NextResponse) {
  const header = headers();
  let url = header.get("x-url") || "";

  if (!url.includes(".jpg") || request.nextUrl.search) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  try {
    const image = await getBase64(
      request.nextUrl.pathname
        .replace("/image", "")
        .replace(".jpg", "")
        .replace("/", "")
    );

    return new Response(
      `<img src="data:image/jpeg;base64,${image}" alt="Ваше изображение">`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    return NextResponse.redirect(new URL("/404", request.url));
  }
}
