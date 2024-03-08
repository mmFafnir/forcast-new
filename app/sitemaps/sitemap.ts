import axios from "axios";
import { MetadataRoute } from "next";
import { parseSitemap } from "../sitemap";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const { data } = await axios.get(
    "https://admin.aibetguru.com/api/app/get_active_sports_type"
  );

  console.log(data);
  return data.sports.map((item: any) => {
    return { id: item.url + "-" + "ru" };
  });
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  console.log("url", id);
  const { data } = await axios.get(`https://admin.aibetguru.com/${id}.xml`);
  console.log(data);
  const sitemapUrls = await parseSitemap(data);
  return sitemapUrls;
}
