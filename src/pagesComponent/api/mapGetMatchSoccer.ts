import { ILeagues } from "../types/TypeSportGroup";

export const mapGetMatchSoccer = (data: ILeagues[]): ILeagues[] => {
  const res: ILeagues[] = [];

  data.forEach((item) => {
    if (item.games.length > 0) {
      res.push(item);
    }
  });
  return res;
};
