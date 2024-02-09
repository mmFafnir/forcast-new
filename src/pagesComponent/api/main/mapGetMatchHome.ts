import { TypeSportGroup } from "@/shared/types/sport";

export const mapGetMatchHome = (data: TypeSportGroup[]): TypeSportGroup[] => {
  const res: TypeSportGroup[] = [];
  data.forEach((item) => {
    if (item.games_count > 0) {
      res.push({
        ...item,
        league: item.league.filter((lg) => lg.games_count > 0),
      });
    }
  });
  return res;
};
