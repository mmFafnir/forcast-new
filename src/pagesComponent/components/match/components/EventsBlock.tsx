"use client";

import { Event, EventNotReady, EventSendRequest } from "@/entities/events";
import EventPremium from "@/entities/events/components/EventPremium";
import TotalMatches from "@/shared/UI/TotalMatches";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypeBet } from "@/shared/types/match";
import dayjs from "dayjs";
import { FC } from "react";

interface IProps {
  events: TypeBet[];
  matchId: number;
  request: boolean;
  favoriteLeague: boolean;
  haveDate: string;
  gameStatus: 0 | 1 | 3;
  showCard: boolean;
}

const textNotDate =
  "Анализ данного матча еще в процессе подготовки: мы ожидаем прогнозы в самое ближайшее время. Добавьте матч в избранное, чтобы получить уведомление о появлении ставок и анализа, как только они будут готовы.";
export const EventsBlock: FC<IProps> = ({
  events,
  matchId,
  request,
  favoriteLeague,
  gameStatus,
  haveDate,
  showCard,
}) => {
  const { user } = useTypeSelector((state) => state.auth);
  console.log(showCard);
  return (
    <>
      {showCard && events.length > 0 && (
        <div className="flex item-center">
          <h2>Список событий</h2>
          <TotalMatches>{events.length}</TotalMatches>
        </div>
      )}
      {showCard &&
        events.map((bet) => {
          if (
            bet.best_bet === "Yes" &&
            user?.premium !== "1" &&
            gameStatus !== 3
          )
            return <EventPremium odds={bet.odds} />;
          return <Event gameStatus={gameStatus} key={bet.id} bet={bet} />;
        })}

      {(events.length == 0 || !showCard) && (
        <>
          {favoriteLeague ? (
            <EventNotReady
              text={
                !haveDate
                  ? textNotDate
                  : `Анализ данного матча еще в процессе подготовки: мы ожидаем последние игры команд для включения этих данных в статистику. Ожидается, что полный прогноз будет доступен после ${dayjs(
                      haveDate
                    )
                      .locale("ru")
                      .format(
                        "DD MMMM"
                      )}. Добавьте матч в избранное, чтобы получить уведомление о появлении ставок и анализа, как только они будут готовы.`
              }
            />
          ) : request ? (
            <EventSendRequest premium={user?.premium === "1"} id={matchId} />
          ) : (
            <EventNotReady />
          )}
        </>
      )}
    </>
  );
};
