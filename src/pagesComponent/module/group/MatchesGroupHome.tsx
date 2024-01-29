"use client";
import { SportGroup } from "@/features/group";
import { FC, useEffect, useState } from "react";
import TypeSportGroup, { ILeagues } from "../../types/TypeSportGroup";
import { FavoritesLeagueHeader } from "@/features/favorites";
import { Match } from "@/entities/match";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { getMatchHome } from "../../api/main/getMatchHome";
import IconEmpty from "@/shared/icons/IconEmpty";
import { PremMatchBanner } from "@/entities/banners";
import Loader from "@/shared/UI/Loader";

interface IProps {
  matches: TypeSportGroup[];
  leagues?: ILeagues[];
}

export const MatchesGroupHome: FC<IProps> = ({ matches }) => {
  const [data, setData] = useState<TypeSportGroup[]>(matches);
  const [loading, setLoading] = useState<boolean | null>(null);
  const { date, timeStatus } = useTypeSelector((state) => state.filters);

  useEffect(() => {
    if (loading === null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getMatchHome({ date, timeStatus })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [date, timeStatus]);

  console.log(data);

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
        data.map((group) => (
          <SportGroup
            key={group.id}
            title={group.name}
            icon={group.url}
            total={group.games_count}
          >
            {group.league.map((lig, index) => (
              <SportGroup
                key={index}
                headerRender={<FavoritesLeagueHeader league={lig} />}
                total={lig.games.length}
              >
                {lig.games.map((game, indexGame) => (
                  <Match key={game.id} match={game} />
                ))}
                {index === 0 && <PremMatchBanner />}
              </SportGroup>
            ))}
          </SportGroup>
        ))}
    </div>
  );
};
