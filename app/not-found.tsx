import { getStaticSeo } from "@/pagesComponent/api/seo/getSeoStatic";
import PageError from "@/pagesComponent/components/not-found/PageError";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getStaticSeo("404");

  return {
    title: seo?.ceo_title || "404",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}

const NotFound = async () => {
  const seo = await getStaticSeo("404");

  return <PageError seo={seo} />;
};

export default NotFound;
