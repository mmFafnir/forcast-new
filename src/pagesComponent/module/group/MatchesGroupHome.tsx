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
  const [loading, setLoading] = useState<boolean | null>(true);

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    const currentUtcId = timeStatus == 1 ? 3 : utcId;
    const currentDate =
      timeStatus == 1
        ? // @ts-ignore
          dayjs().utc().tz(matchTimeZone).format("YYYY-MM-DD")
        : date;
    getMatchHome({
      date: currentDate,
      timeStatus,
      utcId: currentUtcId,
    })
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [timeStatus, utcId]);

  useEffect(() => {
    setLoading(true);
  }, [date]);

  useEffect(() => {
    console.log(matches);
    setTimeout(() => {
      setLoading(null);
    }, 100);
  }, [matches]);

  useEffect(() => {
    dispatch(setLoadingFilter(loading || false));
  }, [loading]);

  return <GroupHome data={data} loading={loading} empty={<EmptyMain />} />;
};

export const MatchesGroupHome = memo(MatchesGroupHomeMemo);
