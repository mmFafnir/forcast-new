"use client";

import { setParamsLink } from "@/features/breadсrumbs/slice/linkSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { FC, ReactNode, useEffect } from "react";

interface IProps {
  links: {
    country: string;
    league: string;
    sport: string;
    match: string;
  };
  children: ReactNode;
}
export const LinksProvider: FC<IProps> = ({ links, children }) => {
  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(setParamsLink(links));
  }, []);
  return <>{children}</>;
};
