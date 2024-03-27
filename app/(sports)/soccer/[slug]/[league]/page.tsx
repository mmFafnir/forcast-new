import { SoccerPage } from "@/pagesComponent";
import { getSeoDynamic } from "@/pagesComponent/api/seo/getSeoDenimic";
import { mapSeoMacros } from "@/pagesComponent/api/seo/mapSeoMacros";
import { getMatchSoccerServer } from "@/pagesComponent/api/soccer/getMatchSoccer";
import { mapGetMatchSoccer } from "@/pagesComponent/api/soccer/mapGetMatchSoccer";
import { getTimezone } from "@/shared/helper/getTimezone";
import { Metadata, NextPage } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import dayJs from "@/shared/core/dayjs";
import React from "react";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";
interface IProps {
  params: {
    slug: string;
    league: string;
  };
  searchParams: { [key: string]: string };
}

export async function generateMetadata({
  params,
  searchParams,
}: IProps): Promise<Metadata> {
  const date = searchParams["date"] || null;
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const utcId = cookieStore.get("utc_id");
  let seo: IFetchSeo | null = null;

  const data = await getMatchSoccerServer({
    date:
      date ||
      // @ts-ignore
      dayJs().utc().tz(getTimezone(utcId?.value)?.zone).format("YYYY-MM-DD"),
    timeStatus: "",
    token: token?.value || "",
    league: params.league,
    country: params.slug,
    utcId: getTimezone(utcId?.value)?.id || "",
  });

  if (!data) return {};
  seo = mapSeoMacros(
    await getSeoDynamic({
      sport_id: 1,
      country_id: data.country?.id || undefined,
      league_id: data.league?.id || undefined,
    }),
    {
      sport_name: data.sport?.title,
      liga_name: data.league?.title,
      country_name: data.country?.title,
    }
  );
  return {
    title: seo?.ceo_title || "Футбол...",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
  };
}

const LeaguePage: NextPage<IProps> = async ({ params, searchParams }) => {
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
    league: params.league,
    country: params.slug,
    utcId: getTimezone(utcId?.value)?.id || "",
  });

  if (!data) return notFound();
  const seo = mapSeoMacros(
    await getSeoDynamic({
      sport_id: 1,
      country_id: data.country?.id || undefined,
      league_id: data.league?.id || undefined,
    }),
    {
      sport_name: data.sport?.title,
      liga_name: data.league?.title,
      country_name: data.country?.title,
    }
  );

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
      href: `/soccer/${params.slug}/${params.league}`,
    });

  if (!seo) return notFound();
  return (
    <SoccerPage
      data={data}
      matches={matches}
      seo={seo}
      breadCumbers={breadCumbers}
    />
  );
};

export default LeaguePage;
