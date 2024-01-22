import { NextPage } from "next";
import { FavoriteAdd } from "@/features/favorites";
import { SharedButton } from "@/features/shared";
import styles from "./styles.module.scss";
import IconPerson from "@/shared/icons/IconPerson";
import { MatchPreview, Views } from "@/entities/match";
import TextMore from "@/shared/UI/TextMore";
import TotalMatches from "@/shared/UI/TotalMatches";
import { Event, EventNotReady, EventSendRequest } from "@/entities/events";
import EventPremium from "@/entities/events/components/EventPremium";
import { Recommend } from "@/features/recommend";
import { getOneMatch } from "@/pagesComponent/api/soccer/getOneMatch";
import Link from "next/link";

const events = {
  odd: "1.59",
  event: "Индивидуальный тотал",
  bet: "Фора Реал Мадрид - 1",
  risk: "Высокий",
  text: "И Вольфсбург (Вольфсбург), и Байер (Байер Леверкузен) демонстрируют стабильную игру в матчах, в которых забивается более 2,5 голов. В последних матчах Вольфсбурга в среднем забивается 2,7 гола, а Байер еще более результативен - 4,1 гола в среднем. Это означает, что исторически и в текущей форме обе команды участвуют в матчах, в которых забивается не менее 3 голов. Учитывая эти данные и форму обеих команд, можно с большой долей вероятности предположить, что в матче будет забито не менее 3 голов, что делает эту ставку надежным вариантом с низким уровнем риска. Учитывая эти данные и форму обеих команд, можно с большой долей вероятности предположить, что в матче будет забито не менее 3 голов, что делает эту ставку И Вольфсбург (Вольфсбург), и Байер (Байер Леверкузен) демонстрируют стабильную игру в матчах, в которых забивается более 2,5 голов. В последних матчах Вольфсбурга в среднем забивается 2,7 гола, а Байер еще более результативен - 4,1 гола в среднем. Это означает, что исторически и в текущей форме обе команды участвуют в матчах, в которых забивается не менее 3 голов. Учитывая эти данные и форму обеих команд, можно с большой долей вероятности предположить, что в матче будет забито не менее 3 голов, что делает эту ставку надежным вариантом с низким уровнем риска. Учитывая эти данные и форму обеих команд, можно с большой долей вероятности предположить, что в матче будет забито не менее 3 голов, что делает эту ставку  ",
};

interface IProps {
  id: string;
}

export const MatchPage: NextPage<IProps> = async ({ id }) => {
  const data = await getOneMatch(id);

  return (
    <div className={styles.page}>
      <div className="flex item-center jc-between">
        <h1>
          Прогноз на матч: {data.home_team.team_name} -{" "}
          {data.away_team.team_name}
        </h1>
        <div className={`flex item-center ${styles.buttons}`}>
          <FavoriteAdd />
          <SharedButton />
        </div>
      </div>
      <div className="flex item-center jc-between">
        <Link href={"/"} className={styles.person}>
          <IconPerson />
          <p>S Æ A-XI</p>
        </Link>
        <Views />
      </div>
      <MatchPreview match={data} />
      <div className={styles.analysis}>
        <TextMore title={"Анализ"} text={<p>{data.game_analize}</p>} />
      </div>
      <div className={styles.events}>
        <div className="flex item-center">
          <h2>Список событий</h2>
          <TotalMatches>{data.cards.length}</TotalMatches>
        </div>

        {data.cards.map((bet) => (
          <Event key={bet.id} bet={bet} />
        ))}
        <EventPremium />
        <EventNotReady />
        <EventSendRequest premium={true} />
        <EventSendRequest premium={false} />
      </div>
      <p className={styles.text}>
        Мы предлагаем бесплатные прогнозы на футбол, основанные на тщательном
        анализе искусственным интеллектом прошлых игр, формы игроков и других
        важных факторов. Наш сайт предлагает онлайн прогнозы на футбол для всех
        популярных лиг и турниров. Лучшие прогнозы на футбол от искусственного
        интеллекта, который является профессионалом помогут вам сделать
        правильный выбор и выиграть. Не упустите шанс сделать успешную ставку на
        футбол с нашими бесплатными и точными прогнозами на футбол сегодня! Сайт
        точных бесплатных прогнозов на футбол. Ai SportsOracle не организует
        игры на деньги. Контент носит исключительно информационный характер.
      </p>
      <div className={styles.recommend}>{/* <Recommend /> */}</div>
    </div>
  );
};
