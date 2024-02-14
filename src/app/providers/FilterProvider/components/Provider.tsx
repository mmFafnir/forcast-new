"use client";

import {
  setCountryFilter,
  setLeagueFilter,
  setSportFilter,
} from "@/features/filters/slice/filterSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { FC, ReactNode, useEffect } from "react";

interface IProps {
  children: ReactNode;
  league: number | "";
  country: number | "";
  sport: number | "";
}
export const FilterProvider: FC<IProps> = ({
  children,
  league,
  country,
  sport,
}) => {
  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(setLeagueFilter(league));
    dispatch(setCountryFilter(country));
    dispatch(setSportFilter(sport));
  }, []);

  return <>{children}</>;
};
