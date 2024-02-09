import { ILeagues } from "./leagues";

export type TypeSportGroup = {
  games_count: number;
  id: number;
  name: string;
  url: string;
  league: ILeagues[];
};
