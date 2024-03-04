import { SoccerPage } from "@/pagesComponent";
import { getMatchSoccerServer } from "@/pagesComponent/api/soccer/getMatchSoccer";
import { mapGetMatchSoccer } from "@/pagesComponent/api/soccer/mapGetMatchSoccer";
import { getTimezone } from "@/shared/helper/getTimezone";
import { Metadata, NextPage } from "next";
import { cookies } from "next/headers";
import dayJs from "@/shared/core/dayjs";
import { getSeoDynamic } from "@/pagesComponent/api/seo/getSeoDenimic";
import { redirect } from "next/navigation";

interface IProps {
  params: {};
  searchParams: { [key: string]: string };
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoDynamic({
    sport_id: 1,
  });

  return {
    title: seo?.ceo_title || "Спорт",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}

const Soccer: NextPage<IProps> = async ({ searchParams }) => {
  const date = searchParams["date"] || null;
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const utcId = cookieStore.get("utc_id");

  const data = await getMatchSoccerServer({
    date:
      date ||
      // @ts-ignore
      dayJs().utc().tz(getTimezone(utcId?.value)?.zone).format("YYYY-MM-DD"),
    timeStatus: "",
    token: token?.value || "",
    country: "",
    league: "",
    utcId: getTimezone(utcId?.value)?.id || "",
  });

  const seo = await getSeoDynamic({
    sport_id: 1,
  });

  const matches = mapGetMatchSoccer(data.data);

  const breadCumbers = [
    {
      title: "Футбол",
      href: "/soccer",
    },
  ];

  console.log("seo", seo);

  if (!seo || !data) return redirect("/404");
  return (
    <SoccerPage
      matches={matches}
      breadCumbers={breadCumbers}
      data={data}
      seo={seo}
    />
  );
};

export default Soccer;
