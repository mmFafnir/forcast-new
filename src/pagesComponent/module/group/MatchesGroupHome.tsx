"use client";
import { FC, memo, useEffect, useState } from "react";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { getMatchHome } from "../../api/main/getMatchHome";
import { ILeagues } from "@/shared/types/leagues";
import { TypeSportGroup } from "@/shared/types/sport";
import { GroupHome } from "@/entities/group";
import { EmptyMain } from "@/pagesComponent/components/main/EmptyMain";
import { setLoadingFilter } from "@/features/filters/slice/filterSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { matchTimeZone } from "@/shared/core/timezone";
import dayjs from "@/shared/core/dayjs";

interface IProps {
  matches: TypeSportGroup[];
  leagues?: ILeagues[];
}

const MatchesGroupHomeMemo: FC<IProps> = ({ matches }) => {
  const dispatch = useTypeDispatch();
  const { date, timeStatus } = useTypeSelector((state) => state.filters);
  const { utcId } = useTypeSelector((state) => state.timezone);

  const [data, setData] = useState<TypeSportGroup[]>(matches);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading === null) {
      setLoading(timeStatus !== "" ? null : false);
      return;
    }
    setLoading(true);
    getMatchHome({
      date:
        timeStatus == 1
          ? // @ts-ignore
            dayjs().utc().tz(matchTimeZone).format("YYYY-MM-DD")
          : date,
      timeStatus,
      utcId,
    })
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [date, timeStatus, utcId]);

  useEffect(() => {
    setData(matches);
  }, [matches]);

  useEffect(() => {
    if (loading === null) return;
    setTimeout(
      () => {
        dispatch(setLoadingFilter(loading));
      },
      loading ? 0 : 300
    );
  }, [loading]);

  return <GroupHome data={data} loading={loading} empty={<EmptyMain />} />;
};

export const MatchesGroupHome = memo(MatchesGroupHomeMemo);
