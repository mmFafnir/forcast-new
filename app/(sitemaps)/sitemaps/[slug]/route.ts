import { parseSitemap } from "@/shared/helper/parseSitemap";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const { Builder } = require("xml2js");

export async function GET(request: NextRequest) {
  const header = headers();
  let url = header.get("x-url") || "";
  let xml;

  if (url.includes(".xml")) {
    const res = await fetch(`http://admin.aibetguru.com${url}`, {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      xml = await res.text();
    } else {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  if (xml) {
    const builder = new Builder();
    const urls = await parseSitemap(xml);
    const obj = {
      urlset: {
        $: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation":
            "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
        },
        url: urls || [],
      },
    };

    return new Response(builder.buildObject(obj), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
  console.log("error");
  NextResponse.redirect(new URL("/404"));
}
