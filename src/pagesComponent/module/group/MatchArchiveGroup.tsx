"use client";
import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import { FC } from "react";

interface IProps {
  matches: IFetchFullMatch[];
}
export const MatchArchiveGroup: FC<IProps> = ({ matches }) => {
  console.log(matches);
  return (
    <div>
      <div></div>
    </div>
  );
};
