"use client";
import { SportGroup } from "@/features/group";
import { FC, useEffect, useState } from "react";
import { ILeagues } from "../../types/TypeSportGroup";
import { FavoritesLeagueHeader } from "@/features/favorites";
import { Match } from "@/entities/match";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import IconEmpty from "@/shared/icons/IconEmpty";
import { getMatchSoccer } from "@/pagesComponent/api/soccer/getMatchSoccer";
import Loader from "@/shared/UI/Loader";

interface IProps {
  matches: ILeagues[];
}

export const MatchesGroup: FC<IProps> = ({ matches }) => {
  const [data, setData] = useState<ILeagues[]>(matches);
  const [loading, setLoading] = useState<boolean | null>(null);
  const { date, timeStatus } = useTypeSelector((state) => state.filters);

  useEffect(() => {
    if (loading === null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getMatchSoccer({ date: timeStatus === 1 ? "" : date, timeStatus })
      .then((res) => {
        setData(res.data);
      })
      .finally(() => setLoading(false));
  }, [date, timeStatus]);

  return (
    <div className="flex-1">
      {loading && (
        <div className="loader-body">
          <Loader />
        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="empty-data">
          <p>Матчи не найдены</p>
          <IconEmpty />
        </div>
      )}
      {!loading &&
        data.map((lig) => (
          <SportGroup
            key={lig.league_id}
            title={lig.league_name}
            headerRender={<FavoritesLeagueHeader league={lig} />}
            total={lig.games.length}
          >
            {lig.games.map((game) => (
              <Match key={game.id} match={game} />
            ))}
          </SportGroup>
        ))}
    </div>
  );
};
