import { TypeLeague } from "@/widgets/Widgets/components/LeaguesWidget";

export interface ILeagues extends TypeLeague {
  games: [];
}

type TypeSportGroup = {
  id: number;
  name: string;
  url: string;
  league: ILeagues[];
};

export default TypeSportGroup;
