import HeaderPage from "@/widgets/HeaderPage";
import { getMatchSoccerServer } from "../../api/soccer/getMatchSoccer";
import { mapGetMatchSoccer } from "../../api/soccer/mapGetMatchSoccer";
import { MatchesGroup } from "@/pagesComponent/module/group/MatchGroup";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { TelegramButton } from "@/features/shared";
import { FC } from "react";
import { cookies } from "next/headers";
import { FilterProvider } from "@/app/providers/FilterProvider";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { Header } from "@/widgets/Header";
import { getTimezone } from "@/shared/helper/getTimezone";
import { DescriptionSEO } from "@/entities/seo-texts";
import dayJs from "@/shared/core/dayjs";

interface IProps {
  date: string | null;
  country?: string;
  league?: string;
}

export const SoccerPage: FC<IProps> = async ({
  date,
  country = "",
  league = "",
}) => {
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
    country: country,
    league: league,
    utcId: getTimezone(utcId?.value)?.id || "",
  });

  const title = data.league
    ? data.country?.title + ": " + data.league.title
    : data.country
    ? data.country.title
    : "";
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
      href: `/soccer/${country}${league}`,
    });

  return (
    <FilterProvider
      sport={data.sport?.id || ""}
      league={data.league?.id || ""}
      country={data.country?.id || ""}
    >
      <LinksProvider
        links={{
          sport: "Футбол",
          league: data.league?.title || "",
          country: data.country?.title || "",
          match: "",
        }}
      >
        <Header breadCrumbs={breadCumbers} />
        <HeaderPage
          title={
            league
              ? title
              : data.country
              ? data.country.title
              : "Прогнозы ставок на футбольные матчи от ИИ"
          }
        />
        <div className="flex-1 flex-col">
          <MatchesGroup matches={matches} league={league} country={country} />
        </div>
        <RiskWidgets isMob />
        <TelegramButton isMob />
        <DescriptionSEO />
      </LinksProvider>
    </FilterProvider>
  );
};
