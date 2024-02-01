export type TypeLeague = {
  created_at: null | string;
  has_leaguetable: number;
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
};

export interface IFetchLeague {
  id: number;
  user_id: null | number | string;
  league_id: number;
  status: "0" | "1";
  created_at: string;
  updated_at: string;
  league: Pick<
    TypeLeague,
    | "id"
    | "league_id"
    | "league_name"
    | "url"
    | "league_cc"
    | "user_pind_count"
    | "user_pind_admin_count"
  >;
}
