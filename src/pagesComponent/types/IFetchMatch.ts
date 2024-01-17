import { ILeagues } from "./TypeSportGroup";

export interface IFetchMatch {
  current_page: number;
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  data: ILeagues[];
}
