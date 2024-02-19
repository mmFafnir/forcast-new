"use client";
import { MatchArchive } from "@/entities/match";
import { getArchive } from "@/pagesComponent/api/archive/getArchiveMatch";
import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import Empty from "@/shared/UI/Empty";
import Loader from "@/shared/UI/Loader";
import Pagination, { TypeLink } from "@/shared/UI/Pagination";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypeBet, TypeMatch } from "@/shared/types/match";
import { FC, useEffect, useState } from "react";

interface IMatch extends TypeMatch {
  card: TypeBet[];
}

interface IProps {
  matches: IMatch[];
  links: TypeLink[];
}
export const MatchArchiveGroup: FC<IProps> = ({ matches, links }) => {
  const [data, setData] = useState<IMatch[]>(matches);
  const [currentLinks, setCurrentLinks] = useState<TypeLink[]>(links);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const { countryId, leagueId, sportId, date } = useTypeSelector(
    (state) => state.filters
  );

  useEffect(() => {
    setLoading(true);
    getArchive({
      date,
      sportId,
      countryId,
      leagueId,
      page: 1,
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
        setCurrentLinks(res.links);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [countryId, leagueId, sportId, date]);

  useEffect(() => {
    setLoading(true);
    getArchive({
      date,
      sportId,
      countryId,
      leagueId,
      page,
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="relative">
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
        setPage={setPage}
      />
    </div>
  );
};
