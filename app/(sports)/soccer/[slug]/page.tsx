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
import { mapSeoMacros } from "@/pagesComponent/api/seo/mapSeoMacros";
import dayjs from "dayjs";
import "dayjs/locale/ru";
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
  }

  if (pageType === "get_match_url") {
    const headersList = headers();
    const isBot = headersList.get("x-bot") || false;
    const data = await getOneMatch(params.slug, token?.value, Boolean(isBot));
    seo = mapSeoMacros(
      await getSeoDynamic({
        sport_id: 1,
        match_id: data?.id || undefined,
      }),
      {
        sport_name: "Футбол",
        country_name:
          data?.league.country.translation || data?.league.country.name,
        liga_name: data?.league.league_name,
        comand_1:
          data?.home_team.translate[0]?.translation ||
          data?.home_team.team_name,
        comand_2:
          data?.away_team.translate[0]?.translation ||
          data?.away_team.team_name,

        date: dayJs()
          // @ts-ignore
          .utc(data?.real_time_carbon)
          .tz(getTimezone(utcId?.value)?.zone)
          .locale("ru")
          .format("D MMMM YYYY"),
      }
    );
  }

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
    const seo = mapSeoMacros(
      await getSeoDynamic({
        sport_id: 1,
        match_id: data?.id || undefined,
      }),
      {
        sport_name: "Футбол",
        country_name:
          data?.league.country.translation || data?.league.country.name,
        liga_name: data?.league.league_name,
        comand_1:
          data?.home_team.translate[0]?.translation ||
          data?.home_team.team_name,
        comand_2:
          data?.away_team.translate[0]?.translation ||
          data?.away_team.team_name,

        date: dayJs()
          // @ts-ignore
          .utc(data?.real_time_carbon)
          .tz(getTimezone(utcId?.value)?.zone)
          .locale("ru")
          .format("D MMMM YYYY"),
      }
    );

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
