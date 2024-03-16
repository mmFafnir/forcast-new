"use client";

import {
  setCountryFilter,
  setDefaultFilter,
  setLeagueFilter,
  setSportFilter,
} from "@/features/filters/slice/filterSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setWebApp } from "@/widgets/Auth/slice/authSlice";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface IProps {
  children: ReactNode;
  league: number | "";
  country: number | "";
  sport: number | "";
  webApp?: boolean;
}
export const FilterProvider: FC<IProps> = ({
  children,
  league,
  country,
  sport,
  webApp,
}) => {
  const dispatch = useTypeDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setDefaultFilter());
  }, [pathname]);

  useEffect(() => {
    dispatch(setLeagueFilter(league));
    dispatch(setCountryFilter(country));
    dispatch(setSportFilter(sport));
    if (webApp) dispatch(setWebApp(webApp));
  }, []);

  return <>{children}</>;
};
