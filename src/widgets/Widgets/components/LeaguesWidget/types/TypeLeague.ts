import { TypeLeague } from "@/shared/types/leagues";

export interface IFetchLeague {
  id: number;
  user_id: null | number | string;
  league_id: number;
  status: "0" | "1";
  created_at: string;
  updated_at: string;
  league: TypeLeague;
}
