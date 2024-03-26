import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getBase64 } from "../../api/image/getBase64";
import { NextApiResponse } from "next";

export async function GET(request: NextRequest, response: NextApiResponse) {
  const header = headers();
  let url = header.get("x-url") || "";

  if (!url.includes(".jpg") || request.nextUrl.search) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  try {
    const base64 = await getBase64(
      request.nextUrl.pathname
        .replace("/image", "")
        .replace(".jpg", "")
        .replace("/", "")
    );

    const headers = new Headers();

    headers.set("Content-Type", "image/*");

    return new NextResponse(Buffer.from(base64, "base64"), {
      status: 200,
      statusText: "OK",
      headers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/404", request.url));
  }
}
