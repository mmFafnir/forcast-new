import { getStaticSeo } from "@/pagesComponent/api/seo/getSeoStatic";
import { getPrivacyPolicy } from "@/pagesComponent/api/static/getPrivacyPolicy";
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
  const data = await getPrivacyPolicy();

  const breadCrumbs = [
    {
      title: "Политика конфиденциальности ",
      href: "/privacy-policy",
    },
  ];

  if (!seo) return notFound();
  return <Privacy breadCrumbs={breadCrumbs} text={data} seo={seo} />;
};

export default PrivacyPolicy;
