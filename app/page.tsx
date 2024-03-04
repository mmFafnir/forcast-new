import { MainPage } from "@/pagesComponent";
import { getMatchMainServer } from "@/pagesComponent/api/main/getMatchHome";
import { getStaticSeo } from "@/pagesComponent/api/seo/getSeoStatic";
import { getTimezone } from "@/shared/helper/getTimezone";
import { Metadata, NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IProps {
  params: {};
  searchParams: { [key: string]: string };
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getStaticSeo("home");
  return {
    title: seo?.ceo_title || "Главня",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}

const Home: NextPage<IProps> = async ({ searchParams }) => {
  const date = searchParams["date"] || null;
  const webApp = searchParams["web_app"];

  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const utcId = cookieStore.get("utc_id");

  const matches = await getMatchMainServer({
    date: date || "",
    timeStatus: "",
    token: token?.value || "",
    utcId: getTimezone(utcId?.value)?.id || "",
  });

  const seo = await getStaticSeo("home");

  if (!seo) redirect("404");
  return (
    <MainPage
      seo={seo}
      matches={matches}
      date={date}
      webApp={webApp === "true" ? true : false}
    />
  );
};

export default Home;
