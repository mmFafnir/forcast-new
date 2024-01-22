import { TypeMatch } from "@/entities/match";
import { TypeLeague } from "@/widgets/Widgets/components/LeaguesWidget";

export interface ILeagues extends TypeLeague {
  games: TypeMatch[];
  game_count: number;
}

type TypeSportGroup = {
  game_count: number;
  id: number;
  name: string;
  url: string;
  league: ILeagues[];
};

export default TypeSportGroup;
