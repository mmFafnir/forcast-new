"use client";
import { MatchArchive } from "@/entities/match";
import { getArchive } from "@/pagesComponent/api/archive/getArchiveMatch";
import Empty from "@/shared/UI/Empty";
import Loader from "@/shared/UI/Loader";
import Pagination, { TypeLink } from "@/shared/UI/Pagination";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypeBet, TypeMatch } from "@/shared/types/match";
import { FC, useEffect, useState } from "react";
import { setLoadingFilter } from "@/features/filters/slice/filterSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { transformDateToTimezone } from "@/shared/helper/getTimezone";

interface IMatch extends TypeMatch {
  card: TypeBet[];
}

export const MatchArchiveGroup: FC = () => {
  const dispatch = useTypeDispatch();
  const [data, setData] = useState<IMatch[]>([]);
  const [currentLinks, setCurrentLinks] = useState<TypeLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { utcId, timezone } = useTypeSelector((state) => state.timezone);
  const { countryId, leagueId, sportId, date } = useTypeSelector(
    (state) => state.filters
  );

  const fetchDate = (page?: number) => {
    setLoading(true);
    getArchive({
      date,
      sportId,
      countryId,
      leagueId,
      utcId,
      page: page || 1,
    })
      .then((res) => {
        setData(res.data);
        setCurrentLinks(res.links);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const today = transformDateToTimezone({
      timezone: timezone,
      format: "YYYY-MM-DD",
    });

    if (date == "" || date == today) return;
    fetchDate();
  }, [date, countryId, leagueId, sportId, utcId]);

  useEffect(() => {
    dispatch(setLoadingFilter(loading));
  }, [loading]);

  return (
    <div>
      {!loading &&
        (data.length > 0 ? (
          data.map((match) => <MatchArchive key={match.id} match={match} />)
        ) : (
          <Empty />
        ))}

      {loading && (
        <div className="loader-hover--no-bg loader--top">
          <Loader />
        </div>
      )}
      <Pagination
        total={data.length * (currentLinks.length - 2)}
        pageSize={10}
        setPage={() => {}}
      />
    </div>
  );
};
