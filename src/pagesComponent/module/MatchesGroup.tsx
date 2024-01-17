"use client";
import { SportGroup } from "@/features/group";
import { FC, useEffect, useState } from "react";
import TypeSportGroup from "../types/TypeSportGroup";
import { FavoritesLeagueHeader } from "@/features/favorites";
import Match from "@/entities/match/components/Match";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { getMatchHome } from "../api/getMatchHome";

interface IProps {
  matches: TypeSportGroup[];
}

export const MatchesGroup: FC<IProps> = ({ matches }) => {
  const [data, setData] = useState<TypeSportGroup[]>(matches);
  const [loading, setLoading] = useState<boolean | null>(null);
  const { date } = useTypeSelector((state) => state.filters);

  useEffect(() => {
    if (loading === null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getMatchHome({ date })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [date]);

  return (
    <div>
      {loading && (
        <div className="loader-hover">
          <span className="loader-spin"></span>
        </div>
      )}
      {data.map((group) => (
        <SportGroup
          key={group.id}
          title={group.name}
          icon={group.url}
          total={20}
        >
          {group.league.map((lig, index) => (
            <SportGroup
              key={index}
              headerRender={<FavoritesLeagueHeader league={lig} />}
              total={20}
            >
              <Match />
              <Match />
              <Match />
            </SportGroup>
          ))}
        </SportGroup>
      ))}
    </div>
  );
};
