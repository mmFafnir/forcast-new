"use client";
import { SportGroup } from "@/features/group";
import { FC, useEffect, useState } from "react";
import { FavoritesLeagueHeader, fetchFavorites } from "@/features/favorites";
import { Match } from "@/entities/match";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import IconEmpty from "@/shared/icons/IconEmpty";
import { PremMatchBanner } from "@/entities/banners";
import Loader from "@/shared/UI/Loader";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setFavorite } from "@/features/favorites/slice/favoritesSlice";
import { mapGetMatchHome } from "@/pagesComponent/api/main/mapGetMatchHome";
import { TypeSportGroup } from "@/shared/types/sport";
import { ILeagues } from "@/shared/types/leagues";
import { TypeMatch } from "@/shared/types/match";

interface IProps {
  matches: TypeSportGroup[];
  leagues?: ILeagues[];
}

export const MatchesFavoritesGroup: FC<IProps> = ({ matches }) => {
  const { favorites } = useTypeSelector((state) => state.favorites);
  const dispatch = useTypeDispatch();

  const [data, setData] = useState<TypeSportGroup[]>(matches);
  const [loading, setLoading] = useState<boolean | null>(null);
  const { date, timeStatus } = useTypeSelector((state) => state.filters);

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

  useEffect(() => {
    let leagues: ILeagues[] = [];
    let games: TypeMatch[] = [];
    matches.forEach((sport) => {
      leagues = [...sport.league, ...leagues];
    });

    leagues.forEach((lig) => {
      games = [...games, ...lig.games];
    });

    dispatch(setFavorite(games.map((game) => game.id)));
  }, []);

  // useEffect(() => {}, [favorites]);

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
