import { IFetchFullMatch } from "./IFetchMatch";

export interface IFetchArchive {
  current_page: number;
  data: IFetchFullMatch[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string | null;
  links: never[];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}
