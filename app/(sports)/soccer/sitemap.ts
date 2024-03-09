import axios from "axios";
import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { parseSitemap } from "../../sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const header = headers();

  const url = header.get("x-url");
  const { data } = await axios.get(`https://admin.aibetguru.com${url}`);

  const sitemapUrls = await parseSitemap(data);
  return sitemapUrls;
}
