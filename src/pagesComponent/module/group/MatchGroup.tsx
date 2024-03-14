"use client";
import { SportGroup } from "@/features/group";
import { FC, memo, useEffect, useState } from "react";
import { FavoritesLeagueHeader } from "@/features/favorites";
import { Match } from "@/entities/match";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import IconEmpty from "@/shared/icons/IconEmpty";
import { getMatchSoccer } from "@/pagesComponent/api/soccer/getMatchSoccer";
import Loader from "@/shared/UI/Loader";
import { ILeagues } from "@/shared/types/leagues";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setLoadingFilter } from "@/features/filters/slice/filterSlice";

interface IProps {
  matches: ILeagues[];
  country?: string;
  league?: string;
}

const MatchesGroupMemo: FC<IProps> = ({
  matches,
  league = "",
  country = "",
}) => {
  const dispatch = useTypeDispatch();
  const [data, setData] = useState<ILeagues[]>(matches);
  const [loading, setLoading] = useState<boolean | null>(null);
  const { date, timeStatus } = useTypeSelector((state) => state.filters);
  const { utcId } = useTypeSelector((state) => state.timezone);

  useEffect(() => {
    if (loading === null) {
      setLoading(false);
      return;
    }
    setLoading(true);

    getMatchSoccer({
      date: timeStatus === 1 ? "" : date,
      timeStatus,
      country,
      league,
      utcId,
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .finally(() => setLoading(false));
  }, [date, timeStatus, utcId]);

  useEffect(() => {
    if (loading === null) return;
    setTimeout(
      () => {
        dispatch(setLoadingFilter(loading));
      },
      loading ? 0 : 300
    );
  }, [loading]);
  return (
    <div className="flex-1 min-h-block relative">
      {data.length === 0 && (
        <div className="empty-data">
          <p>Матчи не найдены</p>
          <IconEmpty />
        </div>
      )}
      {data.map((lig) => (
        <SportGroup
          key={lig.league_id}
          title={
            lig.translate && lig.translate.length > 0
              ? lig.translate[0].translation
              : lig.league_name
          }
          headerRender={<FavoritesLeagueHeader league={lig} />}
          total={lig.games.length}
        >
          {lig.games.map((game) => (
            <Match key={game.id} match={game} />
          ))}
        </SportGroup>
      ))}
      {loading && (
        <div className="loader-hover--fixed">
          <Loader />
        </div>
      )}
    </div>
  );
};

export const MatchesGroup = memo(MatchesGroupMemo);
