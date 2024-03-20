import { TypeLeague } from "@/shared/types/leagues";

export interface ITypePinLeagueData {
  sport: string;
  sportId: string | number;
  leagues: TypeLeague[];
}
