import { NextRequest, NextResponse } from "next/server";

const { parseString, Builder } = require("xml2js");

async function parseSitemap(xmlString: string): Promise<{ loc: string }[]> {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        const urlElements = result.sitemapindex.sitemap;
        const urls = urlElements.map((urlElement: any) => {
          const obj: { [key: string]: string | number } = {
            loc: urlElement.loc[0],
          };
          if (urlElement.changefreq)
            obj.changeFrequency = urlElement.changefreq[0];
          if (urlElement.priority)
            obj.priority = Number(urlElement.priority[0]);

          return obj;
        });
        resolve(urls);
      }
    });
  });
}

export async function GET(request: NextRequest) {
  let xml;
  const res = await fetch(`http://admin.aibetguru.com/sitemap.xml`, {
    method: "GET",
    credentials: "include",
  });
  if (res.ok) {
    xml = await res.text();
  } else {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  if (xml) {
    const builder = new Builder();
    const urls = await parseSitemap(xml);
    const obj = {
      sitemapindex: {
        $: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
        },
        sitemap: urls || [],
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
