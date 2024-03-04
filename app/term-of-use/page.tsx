import { getStaticSeo } from "@/pagesComponent/api/seo/getSeoStatic";
import { getTermOfUse } from "@/pagesComponent/api/static/getTermOfUse";
import Privacy from "@/pagesComponent/components/privacy/Privacy";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getStaticSeo("term-of-use");

  return {
    title: seo?.ceo_title || "",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}
const TermOfUse = async () => {
  const seo = await getStaticSeo("term-of-use");
  const data = await getTermOfUse();

  const breadCrumbs = [
    {
      title: "Условия Пользования",
      href: "/privacy-policy",
    },
  ];
  if (!seo) return notFound();
  return <Privacy breadCrumbs={breadCrumbs} text={data} seo={seo} />;
};

export default TermOfUse;
