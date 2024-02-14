import { TypeCountry } from "@/widgets/Widgets/components/CountriesWidget/types/TypeCountry";
import { TypeMatch } from "./match";

export type TypeLeague = {
  created_at: null | string;
  has_leaguetable: number;
  country_url: string;
  has_toplist: number;
  id: number;
  league_cc: string;
  league_id: number;
  league_name: string;
  sport_id: number;
  table_data: null;
  trans_status: "0" | "1";
  updated_at: string | null;
  url: string;
  user_pind_count: 0 | 1;
  user_pind_admin_count: 0 | 1;
  country: TypeCountry;
};
export interface ILeagues extends TypeLeague {
  games: TypeMatch[];
  games_count: number;
}
