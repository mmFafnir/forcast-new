import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { parseSitemap } from "../../sitemap";
const { Builder } = require("xml2js");

export async function GET() {
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
      return NextResponse.redirect(new URL("/404"));
    }
  }

  if (xml) {
    const builder = new Builder();
    const urls = await parseSitemap(xml);
    const obj = {
      urlset: {
        $: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
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
