import { TypeSportGroup } from "../types/TypeSportGroup";

export const mapGetMatchHome = (data: TypeSportGroup[]): TypeSportGroup[] => {
  const res: TypeSportGroup[] = [];
  data.forEach((item) => {
    if (
      item.league.length > 0 &&
      item.league.filter((lig) => lig.game.length > 0)
    ) {
      res.push(item);
    }
  });
  return res;
};
