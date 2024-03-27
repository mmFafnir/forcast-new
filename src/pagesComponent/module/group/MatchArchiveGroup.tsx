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
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface IMatch extends TypeMatch {
  card: TypeBet[];
}

export const MatchArchiveGroup: FC = () => {
  const dispatch = useTypeDispatch();
  const router = useRouter();
  const [data, setData] = useState<IMatch[]>([]);
  const [currentLinks, setCurrentLinks] = useState<TypeLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    const today = dayjs(transformDateToTimezone()).format("YYYY-MM-DD");
    if (date === today) return;
    fetchDate();
  }, [date, countryId, leagueId, sportId, utcId]);

  useEffect(() => {
    dispatch(setLoadingFilter(loading));
  }, [loading]);

  // useEffect(() => {
  //   window.addEventListener("popstate", (e) => {
  //     console.log(date);
  //     window.location.reload();
  //   });
  // }, []);

  return (
    <div>
      {!loading &&
        (data.length > 0 ? (
          data.map((match) => <MatchArchive key={match.id} match={match} />)
        ) : (
          <Empty />
        ))}

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
