import { ArchiveLayout } from "@/pagesComponent";
import { getStaticSeo } from "@/pagesComponent/api/seo/getSeoStatic";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getStaticSeo("archive");

  return {
    title: seo?.ceo_title || "",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}

export default async function LayoutArchive({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getStaticSeo("archive");

  if (!seo) return notFound();
  return <ArchiveLayout seo={seo}>{children}</ArchiveLayout>;
}
