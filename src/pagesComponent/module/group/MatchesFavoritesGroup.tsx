"use client";
import { SportGroup } from "@/features/group";
import { FC, useEffect, useState } from "react";
import { FavoritesLeagueHeader, fetchFavorites } from "@/features/favorites";
import { Match } from "@/entities/match";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import IconEmpty from "@/shared/icons/IconEmpty";
import { PremMatchBanner } from "@/entities/banners";
import Loader from "@/shared/UI/Loader";
import { mapGetMatchHome } from "@/pagesComponent/api/main/mapGetMatchHome";
import { TypeSportGroup } from "@/shared/types/sport";
import { ILeagues } from "@/shared/types/leagues";

interface IProps {
  leagues?: ILeagues[];
}

export const MatchesFavoritesGroup: FC<IProps> = () => {
  const [data, setData] = useState<TypeSportGroup[]>([]);
  const [loading, setLoading] = useState<boolean | null>(true);
  const { timeStatus } = useTypeSelector((state) => state.filters);

  useEffect(() => {
    if (loading === null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchFavorites(timeStatus)
      .then((res) => {
        setData(mapGetMatchHome(res));
      })
      .finally(() => setLoading(false));
  }, [timeStatus]);

  return (
    <div className="flex-1">
      {loading && (
        <div className="loader-body">
          <Loader />
        </div>
      )}
      {!loading && data.length == 0 && (
        <div className="empty-data">
          <p>Матчи не найдены</p>
          <IconEmpty />
        </div>
      )}
      {!loading &&
        data.map((group) => (
          <SportGroup
            type={"main"}
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
                  <Match key={game.id} type="favorite" match={game} />
                ))}
                {index === 0 && <PremMatchBanner />}
              </SportGroup>
            ))}
          </SportGroup>
        ))}
    </div>
  );
};
