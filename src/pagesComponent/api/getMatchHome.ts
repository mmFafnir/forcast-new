import axios from "@/shared/core/axios";
import TypeSportGroup from "../types/TypeSportGroup";
import { mapGetMatchHome } from "./mapGetMatchHome";

interface IParams {
  date: string;
}
export const getMatchHome = async (
  params?: IParams
): Promise<TypeSportGroup[]> => {
  const { date } = params || { date: "" };
  const { data } = await axios.get(`/get_home_page_matches?date=${date}`);
  return mapGetMatchHome(data.data);
};
