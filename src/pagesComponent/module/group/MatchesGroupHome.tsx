"use client";
import { SportGroup } from "@/features/group";
import { FC, memo, useEffect, useState } from "react";
import { FavoritesLeagueHeader } from "@/features/favorites";
import { Match } from "@/entities/match";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { getMatchHome } from "../../api/main/getMatchHome";
import IconEmpty from "@/shared/icons/IconEmpty";
import { PremMatchBanner } from "@/entities/banners";
import Loader from "@/shared/UI/Loader";
import { ILeagues } from "@/shared/types/leagues";
import { TypeSportGroup } from "@/shared/types/sport";
import { GroupHome } from "@/entities/group";

interface IProps {
  matches: TypeSportGroup[];
  leagues?: ILeagues[];
}

const MatchesGroupHomeMemo: FC<IProps> = ({ matches }) => {
  const [data, setData] = useState<TypeSportGroup[]>(matches);
  const [loading, setLoading] = useState<boolean | null>(null);
  const { date, timeStatus } = useTypeSelector((state) => state.filters);
  useEffect(() => {
    if (loading === null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getMatchHome({ date, timeStatus })
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [date, timeStatus]);

  useEffect(() => {
    setData(matches);
  }, [matches]);

  return <GroupHome data={data} loading={loading} />;
};

export const MatchesGroupHome = memo(MatchesGroupHomeMemo);
