import { headers } from "next/headers";
import { NextResponse } from "next/server";
const { parseString, Builder } = require("xml2js");

// Пример преобразования строки с данными XML в массив объектов URL
export async function parseSitemap(xmlString: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        const urlElements = result.urlset.url;
        console.log(urlElements);
        const urls = urlElements.map((urlElement: any) => ({
          loc: urlElement.loc[0],
          changefreq: urlElement.changefreq
            ? urlElement.changefreq[0]
            : "monthly",
          priority: urlElement.priority ? Number(urlElement.priority[0]) : 1,
        }));

        const obj = {
          urlset: {
            $: {
              xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
            },
            url: urls,
          },
        };

        resolve(obj);
      }
    });
  });
}

export async function GET(res: Response) {
  const header = headers();
  const xml = header.get("x-xml");
  if (xml) {
    const builder = new Builder();
    const sitemap = await parseSitemap(xml);
    return new Response(builder.buildObject(sitemap), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
  return NextResponse.error();
}
