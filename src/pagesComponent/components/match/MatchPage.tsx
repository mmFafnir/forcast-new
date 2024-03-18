"use server";
import { NextPage } from "next";
import { FavoriteAdd } from "@/features/favorites";
import { SharedButton } from "@/features/shared";
import styles from "./styles.module.scss";
import IconPerson from "@/shared/icons/IconPerson";
import { MatchPreview, MatchPreviewSticky, Views } from "@/entities/match";
import TextMore from "@/shared/UI/TextMore";
import Link from "next/link";
import { cookies } from "next/headers";
import { Recommend } from "@/features/recommend";
import { getRecommendServer } from "@/pagesComponent/api/soccer/getRecommend";
import { Header } from "@/widgets/Header";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { EventsBlock } from "./components/EventsBlock";
import { getTimezone } from "@/shared/helper/getTimezone";
import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";
import { TextDate } from "./components/Title";
import { FilterProvider } from "@/app/providers/FilterProvider";

interface IProps {
  data: IFetchFullMatch;
  seo: IFetchSeo;
}

export const MatchPage: NextPage<IProps> = async ({ data, seo }) => {
  const cookieStore = cookies();
  const utcId = cookieStore.get("utc_id");

  const countryTitle = data.league.country
    ? data.league.country.translation || data.league.country.name
    : "";

  const leagueTitle =
    data?.league.translate && data?.league.translate.length > 0
      ? data?.league.translate[0].translation
      : data?.league.league_name;

  const matchTitle = `${
    data.home_team.translate[0]
      ? data.home_team.translate[0].translation
      : data.home_team.team_name
  } - ${
    data.away_team.translate[0]
      ? data.away_team.translate[0].translation
      : data.away_team.team_name
  }`;

  const breadCrumbs = [
    {
      title: "Футбол",
      href: "/soccer",
    },
    {
      title: leagueTitle,
      href: `/soccer/${data.league.url}`,
    },
    {
      title: matchTitle,
      href: data.url,
    },
  ];

  if (data.league.country) {
    breadCrumbs.splice(1, 0, {
      title: countryTitle,
      href: `/soccer/${data.league.country.url}`,
    });
  }
  return (
    <FilterProvider
      sport={data.sport_id || ""}
      league={data.league?.id || ""}
      country={data.league?.country?.id || ""}
    >
      <LinksProvider
        links={{
          country: countryTitle,
          league: leagueTitle,
          sport: "Футбол",
          match: "",
        }}
      >
        <Header breadCrumbs={breadCrumbs} />
        <div className={styles.page}>
          <MatchPreviewSticky match={data} />
          <div className="flex item-center jc-between">
            <h1>
              <TextDate text={seo.ceo_h} time={data.real_time_carbon} />
            </h1>
          </div>
          <div className="flex item-center jc-between flex-wrap">
            <p className={styles.person}>
              <IconPerson />
              <p>S Æ A-XI</p>
            </p>
            {data.cards.length > 0 && data.time_status == 3 && (
              <div className={styles.eventTotal}>
                <p>
                  Всего:{" "}
                  {data.cards.filter((card) => card.status == "1").length}/
                  {data.cards.length}
                </p>
                <p>
                  Лучшая:{" "}
                  {
                    data.best_bet_card.filter((card) => card.status == "1")
                      .length
                  }
                  /{data.best_bet_card.length}
                </p>
              </div>
            )}
            <div className={styles.buttonsTable}>
              <FavoriteAdd
                active={
                  data.favorite_auth_user_count == 1 ||
                  data.favorite_game == "1"
                }
                ids={[data.id]}
                type="default"
              />
              <SharedButton />
            </div>
            <Views count={data.game_view_count} className={styles.view} />
          </div>
          <MatchPreview match={data} />

          {data.game_analize && (
            <div className={styles.analysis}>
              <TextMore
                title={<span className={styles.analysisTitle}>Анализ</span>}
                text={
                  <p className={styles.analysisText}>{data.game_analize}</p>
                }
              />
            </div>
          )}

          <div
            style={{
              paddingTop: data.game_analize ? "0px" : "",
            }}
            className={`${styles.events} ${
              data.cards.length === 0 ? styles.eventsOne : ""
            }`}
          >
            <EventsBlock
              events={data.cards}
              matchId={data.id}
              gameStatus={data.time_status}
              request={data.request_for_card_button}
              favoriteLeague={data.league.favorit === "1"}
            />
          </div>

          <div className={styles.recommend}>
            <Recommend
              isCountry={!!data.league.country}
              isLeague
              id={data.id}
              data={[]}
            />
          </div>
        </div>
      </LinksProvider>
    </FilterProvider>
  );
};
