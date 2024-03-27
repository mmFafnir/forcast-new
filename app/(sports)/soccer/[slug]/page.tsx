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
import { convertUtcOffsetToDate } from "@/shared/helper/convertUtcOffsetToDate";
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

  if (pageType === "country_url") {
    const date = searchParams["date"] || null;
    const data = await getMatchSoccerServer({
      date:
        date ||
        // @ts-ignore
        dayJs().utc().tz(getTimezone(utcId?.value)?.zone).format("YYYY-MM-DD"),
      timeStatus: "",
      token: token?.value || "",
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
  }

  if (pageType === "get_match_url") {
    const headersList = headers();
    const isBot = headersList.get("x-bot") || false;
    const data = await getOneMatch(params.slug, token?.value, Boolean(isBot));

    const utcTime = convertUtcOffsetToDate(
      getTimezone(utcId?.value)?.utc || "UTC+3",
      data?.real_time_carbon
    );

    const timezoneDate = dayJs(utcTime).locale("ru").format("D MMMM YYYY");

    seo = mapSeoMacros(
      await getSeoDynamic({
        sport_id: 1,
        match_id: data?.id || undefined,
      }),
      {
        sport_name: "Футбол",
        country_name: data?.league.country
          ? data?.league.country.translation || data?.league.country.name
          : "",
        liga_name:
          data?.league?.translate && data?.league.translate.length > 0
            ? data?.league.translate[0].translation
            : data?.league?.league_name,
        comand_1:
          data?.home_team.translate[0]?.translation ||
          data?.home_team.team_name,
        comand_2:
          data?.away_team.translate[0]?.translation ||
          data?.away_team.team_name,

        date: timezoneDate,
      }
    );
  }

  console.log(params.slug);
  return {
    title: seo?.ceo_title || "Футбол...",
    description: seo?.ceo_description || "",
    keywords: seo?.ceo_keywords || "",
    openGraph: {
      images: `https://forcast-new.vercel.app/image/${params.slug}.jpg`,
    },
  };
}

const SoccerSlugPage: NextPage<IProps> = async ({ params, searchParams }) => {
  const pageType = await getTypePage(params.slug);
  const date = searchParams["date"] || null;
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const utcId = cookieStore.get("utc_id");

  if (pageType === "country_url") {
    const data = await getMatchSoccerServer({
      date:
        date ||
        // @ts-ignore
        dayJs().utc().tz(getTimezone(utcId?.value)?.zone).format("YYYY-MM-DD"),
      timeStatus: "",
      token: token?.value || "",
      country: pageType === "country_url" ? params.slug : undefined,
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
        href: `/soccer/${params.slug}`,
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
  }

  if (pageType === "get_match_url") {
    const headersList = headers();
    const isBot = headersList.get("x-bot") || false;
    const data = await getOneMatch(params.slug, token?.value, Boolean(isBot));

    const utcTime = convertUtcOffsetToDate(
      getTimezone(utcId?.value)?.utc || "UTC+3",
      data?.real_time_carbon
    );

    const timezoneDate = dayJs(utcTime).format("YYYY-MM-DD HH:mm");

    const seo = mapSeoMacros(
      await getSeoDynamic({
        sport_id: 1,
        match_id: data?.id || undefined,
      }),
      {
        sport_name: "Футбол",
        country_name: data?.league.country
          ? data?.league.country.translation || data?.league.country.name
          : "",
        liga_name:
          data?.league?.translate && data?.league.translate.length > 0
            ? data?.league.translate[0].translation
            : data?.league?.league_name,
        comand_1:
          data?.home_team.translate[0]?.translation ||
          data?.home_team.team_name,
        comand_2:
          data?.away_team.translate[0]?.translation ||
          data?.away_team.team_name,

        date: timezoneDate,
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
