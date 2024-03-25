"use client";
import { MatchArchive } from "@/entities/match";
import { getArchive } from "@/pagesComponent/api/archive/getArchiveMatch";
import Empty from "@/shared/UI/Empty";
import Loader from "@/shared/UI/Loader";
import Pagination, { TypeLink } from "@/shared/UI/Pagination";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypeBet, TypeMatch } from "@/shared/types/match";
import dayJs from "@/shared/core/dayjs";
import { FC, useEffect, useState } from "react";
import { matchTimeZone } from "@/shared/core/timezone";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";
import { setLoadingFilter } from "@/features/filters/slice/filterSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";

interface IMatch extends TypeMatch {
  card: TypeBet[];
}

interface IProps {
  matches: IMatch[];
  links: TypeLink[];
}
export const MatchArchiveGroup: FC<IProps> = ({ matches, links }) => {
  const dispatch = useTypeDispatch();

  const [data, setData] = useState<IMatch[]>(matches);
  const [currentLinks, setCurrentLinks] = useState<TypeLink[]>(links);
  const [loading, setLoading] = useState<boolean>(false);

  const { utcId } = useTypeSelector((state) => state.timezone);
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
    // @ts-ignore
    if (date === dayJs().utc().tz(matchTimeZone).format("YYYY-MM-DD")) return;
    fetchDate();
  }, [date, countryId, leagueId, sportId, utcId]);

  useEffect(() => {
    setTimeout(
      () => {
        dispatch(setLoadingFilter(loading));
      },
      loading ? 0 : 300
    );
  }, [loading]);

  return (
    <div>
      {data.map((match) => (
        <MatchArchive key={match.id} match={match} />
      ))}
      {data.length === 0 && <Empty />}
      {loading && (
        <div className="loader-hover--no-bg">
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
