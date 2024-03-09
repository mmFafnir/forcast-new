import axios from "axios";
import { MetadataRoute } from "next";
const { parseString } = require("xml2js");

// Пример преобразования строки с данными XML в массив объектов URL
export async function parseSitemap(
  xmlString: string
): Promise<{ url: string }[]> {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        const urlElements = result.urlset.url;
        const urls = urlElements.map((urlElement: any) => ({
          url: urlElement.loc[0],
          changeFrequency: urlElement.changefreq
            ? urlElement.changefreq[0]
            : "monthly",
          priority: urlElement.priority ? Number(urlElement.priority[0]) : 1,
        }));
        resolve(urls);
      }
    });
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await axios.get("https://admin.aibetguru.com/sitemap.xml");
  console.log(data);
  const sitemapUrls = await parseSitemap(data);
  return sitemapUrls;
}
