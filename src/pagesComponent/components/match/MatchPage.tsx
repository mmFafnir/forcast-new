import { NextPage } from "next";
import { FavoriteAdd } from "@/features/favorites";
import { SharedButton } from "@/features/shared";
import styles from "./styles.module.scss";
import IconPerson from "@/shared/icons/IconPerson";
import { MatchPreview, MatchPreviewSticky, Views } from "@/entities/match";
import TextMore from "@/shared/UI/TextMore";
import { getOneMatch } from "@/pagesComponent/api/soccer/getOneMatch";
import Link from "next/link";
import { cookies } from "next/headers";
import { Recommend } from "@/features/recommend";
import { getRecommendServer } from "@/pagesComponent/api/soccer/getRecommend";
import { Header } from "@/widgets/Header";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { EventsBlock } from "./components/EventsBlock";

interface IProps {
  url: string;
}

export const MatchPage: NextPage<IProps> = async ({ url }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const data = await getOneMatch(url, token?.value);
  const recommendData = data ? await getRecommendServer({ id: data.id }) : [];

  if (!data)
    return (
      <div>
        <p>500 ошибка</p>
      </div>
    );

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
          <h1>
            Прогноз на матч: {data.home_team.team_name} -{" "}
            {data.away_team.team_name}
          </h1>
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
        <p className={styles.text}>
          Мы предлагаем бесплатные прогнозы на футбол, основанные на тщательном
          анализе искусственным интеллектом прошлых игр, формы игроков и других
          важных факторов. Наш сайт предлагает онлайн прогнозы на футбол для
          всех популярных лиг и турниров. Лучшие прогнозы на футбол от
          искусственного интеллекта, который является профессионалом помогут вам
          сделать правильный выбор и выиграть. Не упустите шанс сделать успешную
          ставку на футбол с нашими бесплатными и точными прогнозами на футбол
          сегодня! Сайт точных бесплатных прогнозов на футбол. Ai SportsOracle
          не организует игры на деньги. Контент носит исключительно
          информационный характер.
        </p>
      </div>
    </LinksProvider>
  );
};
