import TypeSportGroup from "../../types/TypeSportGroup";

export const mapGetMatchHome = (data: TypeSportGroup[]): TypeSportGroup[] => {
  const res: TypeSportGroup[] = [];
  data.forEach((item) => {
    if (item.game_count > 0) {
      res.push({
        ...item,
        league: item.league.filter((lg) => lg.game_count > 0),
      });
    }
  });
  return res;
};
