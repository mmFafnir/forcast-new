import { TypeTimeStatus } from "@/features/filters";
import axios from "axios";
import { IFetchDataSearch } from "../types";
import { mapGetMatchHome } from "./mapGetMatches";
import { TypeSportGroup } from "@/shared/types/sport";

interface IParams {
  search: string;
  time_status: number | string;
  order_by_cf: "desc" | "asc";
  sport_type: number;
}
export const getMatches = async (
  params: IParams
): Promise<TypeSportGroup[]> => {
  const { search, time_status, order_by_cf, sport_type } = params;
  try {
    const { data } = await axios.get(
      `/search_match?sport_type=${sport_type}&search=${search}&time_status=${time_status}&order_by_cf=${order_by_cf}`
    );
    return mapGetMatchHome(data.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};
