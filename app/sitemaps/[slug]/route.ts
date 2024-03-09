import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { parseSitemap } from "../../sitemap";
const { Builder } = require("xml2js");

export async function GET() {
  const header = headers();
  const xml = header.get("x-xml");
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
