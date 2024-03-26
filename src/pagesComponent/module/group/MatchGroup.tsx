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
import { useSearchParams } from "next/navigation";

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
  const search = useSearchParams();
  const dispatch = useTypeDispatch();
  const [data, setData] = useState<ILeagues[]>(matches);
  const [loading, setLoading] = useState<boolean | null>(true);
  const { date, timeStatus } = useTypeSelector((state) => state.filters);
  const { utcId } = useTypeSelector((state) => state.timezone);

  const fetchMatches = () => {
    setLoading(true);
    const currentUtcId = timeStatus == 1 ? 3 : utcId;
    const currentDate =
      timeStatus == 1
        ? // @ts-ignore
          dayjs().utc().tz(matchTimeZone).format("YYYY-MM-DD")
        : date;
    getMatchSoccer({
      date: currentDate,
      timeStatus,
      country,
      league,
      utcId: currentUtcId,
    })
      .then((res) => {
        setData(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (loading) return;
    console.log(search.get("date"), date);
    fetchMatches();
  }, [timeStatus, utcId]);

  useEffect(() => {
    setLoading(true);
    if (loading) return;
    console.log(search.get("date"), loading);
    console.log(matches);
    if (!search.get("date") && loading == false) fetchMatches();
  }, [date]);

  useEffect(() => {
    // console.log(matches);
    setTimeout(() => {
      setLoading(null);
    }, 100);
  }, [matches]);

  useEffect(() => {
    dispatch(setLoadingFilter(loading || false));
  }, [loading]);

  return (
    <div className="flex-1 min-h-block relative">
      {data.length === 0 && (
        <div>
          <div className="empty-data">
            <p>Матчи не найдены</p>
            <IconEmpty />
          </div>
        </div>
      )}
      {!loading &&
        data.map((lig) => (
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
