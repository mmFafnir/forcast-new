import { TypeLeague } from "../../LeaguesWidget/types/TypeLeague";

export type TypeCountry = {
  code: string;
  id: number;
  league: TypeLeague[];
  name: string;
  status: "0" | "1";
  trans_status: "1" | "0";
  translation: string;
  updated_at: string;
};

export interface IFetchDataCountries {
  current_page: number;
  data: TypeCountry[];
  first_page_url: string;
  from: number;
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
}
