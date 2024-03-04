import React from "react";
import { MatchPage, SoccerPage } from "@/pagesComponent";
import { getTypePage } from "@/pagesComponent/api/general/getTypePage";
import { getSeoDynamic } from "@/pagesComponent/api/seo/getSeoDenimic";
import { getMatchSoccerServer } from "@/pagesComponent/api/soccer/getMatchSoccer";
import { mapGetMatchSoccer } from "@/pagesComponent/api/soccer/mapGetMatchSoccer";
import { getTimezone } from "@/shared/helper/getTimezone";
import { Metadata, NextPage } from "next";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import dayJs from "@/shared/core/dayjs";
import { getOneMatch } from "@/pagesComponent/api/soccer/getOneMatch";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";

interface IProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string };
}

export async function generateMetadata({
  params,
  searchParams,
}: IProps): Promise<Metadata> {
  const pageType = await getTypePage(params.slug);
  let seo: IFetchSeo | null = null;
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const utcId = cookieStore.get("utc_id");

  if (pageType === "country_url" || pageType === "league_url") {
    const date = searchParams["date"] || null;
    const data = await getMatchSoccerServer({
      date:
        date ||
        // @ts-ignore
        dayJs().utc().tz(getTimezone(utcId?.value)?.zone).format("YYYY-MM-DD"),
      timeStatus: "",
      token: token?.value || "",
      country: pageType === "country_url" ? params.slug : undefined,
      league: pageType === "league_url" ? params.slug : undefined,
      utcId: getTimezone(utcId?.value)?.id || "",
    });

    seo = await getSeoDynamic({
      sport_id: 1,
      country_id: data.country?.id || undefined,
      league_id: data.league?.id || undefined,
    });
  }

  if (pageType === "get_match_url") {
    const headersList = headers();
    const isBot = headersList.get("x-bot") || false;
    const data = await getOneMatch(params.slug, token?.value, Boolean(isBot));
    seo = await getSeoDynamic({
      sport_id: 1,
      match_id: data?.id || undefined,
    });
  }
  console.log("seo", seo);
  return {
    title: seo?.ceo_title || "Футбол...",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}

const SoccerSlugPage: NextPage<IProps> = async ({ params, searchParams }) => {
  const pageType = await getTypePage(params.slug);
  const date = searchParams["date"] || null;
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const utcId = cookieStore.get("utc_id");

  if (pageType === "country_url" || pageType === "league_url") {
    const data = await getMatchSoccerServer({
      date:
        date ||
        // @ts-ignore
        dayJs().utc().tz(getTimezone(utcId?.value)?.zone).format("YYYY-MM-DD"),
      timeStatus: "",
      token: token?.value || "",
      country: pageType === "country_url" ? params.slug : undefined,
      league: pageType === "league_url" ? params.slug : undefined,
      utcId: getTimezone(utcId?.value)?.id || "",
    });

    const seo = await getSeoDynamic({
      sport_id: 1,
      country_id: data.country?.id || undefined,
      league_id: data.league?.id || undefined,
    });

    const matches = mapGetMatchSoccer(data.data);

    const breadCumbers = [
      {
        title: "Футбол",
        href: "/soccer",
      },
    ];
    if (data.country)
      breadCumbers.push({
        title: data.country.title,
        href: `/soccer/${data.country.url}`,
      });
    if (data.league)
      breadCumbers.push({
        title: data.league.title,
        href: `/soccer/${params.slug}`,
      });

    if (!seo) return notFound();
    return (
      <SoccerPage
        data={data}
        matches={matches}
        seo={seo}
        breadCumbers={breadCumbers}
        country={params.slug}
      />
    );
  }

  if (pageType === "get_match_url") {
    const headersList = headers();
    const isBot = headersList.get("x-bot") || false;
    const data = await getOneMatch(params.slug, token?.value, Boolean(isBot));
    const seo = await getSeoDynamic({
      sport_id: 1,
      match_id: data?.id || undefined,
    });

    if (!data || !seo)
      return (
        <div>
          <p>500 ошибка</p>
        </div>
      );
    return <MatchPage seo={seo} data={data} />;
  }
  return notFound();
};

export default SoccerSlugPage;
