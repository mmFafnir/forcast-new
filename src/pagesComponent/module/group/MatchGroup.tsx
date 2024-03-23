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
import { matchTimeZone } from "@/shared/core/timezone";
import dayjs from "@/shared/core/dayjs";

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
      setLoading(timeStatus !== "" ? null : false);
      return;
    }
    setLoading(true);
    getMatchSoccer({
      date:
        timeStatus == 1
          ? // @ts-ignore
            dayjs().utc().tz(matchTimeZone).format("YYYY-MM-DD")
          : date,
      timeStatus,
      country,
      league,
      utcId,
    })
      .then((res) => {
        setData(res.data);
      })
      .finally(() => setLoading(false));
  }, [timeStatus, utcId]);

  useEffect(() => {
    if (loading === null) {
      setLoading(timeStatus !== "" ? null : false);
      return;
    }
    setLoading(true);
    console.log(date);
  }, [date]);

  useEffect(() => {
    setLoading(null);
  }, [matches]);

  useEffect(() => {
    // if (loading === null) return;
    dispatch(setLoadingFilter(loading || false));
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
          type="main"
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
      <div className={`loader-hover--fixed ${loading ? "show" : "hidden"}`}>
        <Loader />
      </div>
    </div>
  );
};

export const MatchesGroup = memo(MatchesGroupMemo);
