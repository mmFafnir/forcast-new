import { FavoritesPage } from "@/pagesComponent";
import { getStaticSeo } from "@/pagesComponent/api/seo/getSeoStatic";
import { Metadata, NextPage } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getStaticSeo("favorite");

  return {
    title: seo?.ceo_title || "AibetGuru|Favorite",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}
const Favorites: NextPage = async () => {
  const seo = await getStaticSeo("favorite");

  return <FavoritesPage seo={seo} />;
};

export default Favorites;
