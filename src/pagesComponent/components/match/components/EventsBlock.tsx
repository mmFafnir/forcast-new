"use client";

import { Event, EventNotReady, EventSendRequest } from "@/entities/events";
import EventPremium from "@/entities/events/components/EventPremium";
import TotalMatches from "@/shared/UI/TotalMatches";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { EnumStatus } from "@/shared/types/Enums";
import { TypeBet } from "@/shared/types/match";
import { FC } from "react";

interface IProps {
  events: TypeBet[];
  matchId: number;
  request: boolean;
  favoriteLeague: boolean;
}
export const EventsBlock: FC<IProps> = ({
  events,
  matchId,
  request,
  favoriteLeague,
}) => {
  const { user, status } = useTypeSelector((state) => state.auth);

  if (status === EnumStatus.LOADING) return <></>;
  return (
    <>
      {events.length > 0 && (
        <div className="flex item-center">
          <h2>Список событий</h2>
          <TotalMatches>{events.length}</TotalMatches>
        </div>
      )}
      {events.map((bet) => {
        if (bet.best_bet === "Yes" && user?.premium !== "1")
          return <EventPremium odds={bet.odds} />;
        return <Event key={bet.id} bet={bet} />;
      })}

      {favoriteLeague ? (
        <EventNotReady text="Анализ данного матча еще в процессе подготовки: мы ожидаем последние игры команд для включения этих данных в статистику. Ожидается, что полный прогноз будет доступен после 8 октября. Добавьте матч в избранное, чтобы получить уведомление о появлении ставок и анализа, как только они будут готовы." />
      ) : events.length == 0 && request ? (
        <EventSendRequest premium={user?.premium === "1"} id={matchId} />
      ) : (
        <EventNotReady />
      )}
    </>
  );
};
