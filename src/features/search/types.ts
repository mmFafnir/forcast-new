import { ILeagues } from "@/shared/types/leagues";

export interface IFetchDataSearch {
  games_count: number;
  id: number;
  league: ILeagues[];
  name: string;
  order: "1" | "0";
  status: "0" | "1";
  trans_status: "1" | "0";
  updated_at: string;
  url: string;
}
