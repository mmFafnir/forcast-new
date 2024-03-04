import { getStaticSeo } from "@/pagesComponent/api/seo/getSeoStatic";
import Privacy from "@/pagesComponent/components/privacy/Privacy";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getStaticSeo("privacy-policy");

  return {
    title: seo?.ceo_title || "",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}
const PrivacyPolicy = async () => {
  const seo = await getStaticSeo("privacy-policy");

  if (!seo) return notFound();
  return <Privacy seo={seo} />;
};

export default PrivacyPolicy;
