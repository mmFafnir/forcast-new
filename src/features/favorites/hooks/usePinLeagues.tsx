"use client";
import { useEffect, useState } from "react";
import { ITypePinLeagueData } from "../types/ITypePinLeagueData";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

export const usePinLeagues = () => {
  const { pinDefaultLeagues, pinUserLeagues } = useTypeSelector(
    (state) => state.pinLeague
  );
  const [data, setData] = useState<ITypePinLeagueData[]>([]);

  useEffect(() => {
    console.log(pinDefaultLeagues, pinUserLeagues);
    const newData: ITypePinLeagueData[] = [];

    [...pinUserLeagues, ...pinDefaultLeagues].forEach((league) => {
      const dataLeague = newData.find((item) => item.sportId == 1);
      if (dataLeague) {
        dataLeague.leagues.push(league);
      } else {
        newData.push({
          sport: "Футбол",
          sportId: 1,
          leagues: [league],
        });
      }
    });
    setData(newData.reverse());
  }, [pinDefaultLeagues, pinUserLeagues]);

  return data;
};
