import { TypeCountry } from "@/shared/types/country";

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
