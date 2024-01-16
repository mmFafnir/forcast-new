import { TypeLeague } from "@/widgets/Widgets/components/LeaguesWidget/types/TypeLeague";

export interface ILeagues extends TypeLeague {
  game: [];
}

export type TypeSportGroup = {
  id: number;
  name: string;
  url: string;
  league: ILeagues[];
};
