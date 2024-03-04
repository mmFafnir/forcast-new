import { getStaticSeo } from "@/pagesComponent/api/seo/getSeoStatic";
import { getFaqs } from "@/pagesComponent/api/static/getFaqs";
import FaqPage from "@/pagesComponent/components/faq/FaqPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getStaticSeo("faq");

  return {
    title: seo?.ceo_title || "",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}
const Faq = async () => {
  const seo = await getStaticSeo("faq");
  const faqs = await getFaqs();

  if (!seo) return notFound();
  return <FaqPage faqs={faqs} seo={seo} />;
};

export default Faq;
