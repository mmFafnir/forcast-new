import { TypeBet, TypeMatch } from "@/shared/types/match";

interface IMatch extends TypeMatch {
  card: TypeBet[];
}

export interface IFetchArchive {
  current_page: number;
  data: IMatch[];
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
  startDate: string;
}
