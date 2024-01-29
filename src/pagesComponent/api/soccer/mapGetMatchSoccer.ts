import { ILeagues } from "../../types/TypeSportGroup";

export const mapGetMatchSoccer = (data: ILeagues[]): ILeagues[] => {
  const res: ILeagues[] = [];
  data.forEach((item) => {
    if (item.games_count > 0) {
      res.push(item);
    }
  });
  return res;
};
