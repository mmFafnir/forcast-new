"use server";
import { Metadata, NextPage } from "next";
import { FavoriteAdd } from "@/features/favorites";
import { SharedButton } from "@/features/shared";
import styles from "./styles.module.scss";
import IconPerson from "@/shared/icons/IconPerson";
import { MatchPreview, MatchPreviewSticky, Views } from "@/entities/match";
import TextMore from "@/shared/UI/TextMore";
import { getOneMatch } from "@/pagesComponent/api/soccer/getOneMatch";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { Recommend } from "@/features/recommend";
import { getRecommendServer } from "@/pagesComponent/api/soccer/getRecommend";
import { Header } from "@/widgets/Header";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { EventsBlock } from "./components/EventsBlock";
import { getTimezone } from "@/shared/helper/getTimezone";
import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";

interface IProps {
  data: IFetchFullMatch;
  seo: IFetchSeo;
}

export const MatchPage: NextPage<IProps> = async ({ data, seo }) => {
  const cookieStore = cookies();
  const utcId = cookieStore.get("utc_id");

  const recommendData = data
    ? await getRecommendServer({
        id: data.id,
        utcId: getTimezone(utcId?.value)?.id || "",
      })
    : [];

  const countryTitle =
    data.league.country.translation || data.league.country.name;
  const leagueTitle = data.league.league_name;
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
      title: countryTitle,
      href: `/soccer/${data.league.country.url}`,
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

  return (
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
          <h1>{seo.ceo_title}</h1>
          <div className={`flex item-center ${styles.buttons}`}>
            <FavoriteAdd
              active={data.favorite_auth_user_count === 1}
              ids={[data.id]}
              type="default"
            />
            <SharedButton />
          </div>
        </div>
        <div className="flex item-center jc-between">
          <Link href={"/"} className={styles.person}>
            <IconPerson />
            <p>S Æ A-XI</p>
          </Link>
          <div className={styles.buttonsTable}>
            <FavoriteAdd
              active={
                data.favorite_auth_user_count == 1 || data.favorite_game == "1"
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
            <TextMore title={"Анализ"} text={<p>{data.game_analize}</p>} />
          </div>
        )}

        <div
          className={`${styles.events} ${
            data.cards.length === 0 ? styles.eventsOne : ""
          }`}
        >
          <EventsBlock
            events={data.cards}
            matchId={data.id}
            request={data.request_for_card_button}
            favoriteLeague={data.league.favorit === "1"}
          />
        </div>

        {recommendData.length > 0 && (
          <div className={styles.recommend}>
            <Recommend id={data.id} data={recommendData} />
          </div>
        )}
      </div>
    </LinksProvider>
  );
};
