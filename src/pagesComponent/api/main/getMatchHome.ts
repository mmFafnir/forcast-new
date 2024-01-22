import axios from "@/shared/core/axios";
import TypeSportGroup from "../../types/TypeSportGroup";
import { mapGetMatchHome } from "./mapGetMatchHome";
import { TypeTimeStatus } from "@/features/filters";

interface IParams {
  date: string;
  timeStatus: TypeTimeStatus;
}
export const getMatchHome = async (
  params?: IParams
): Promise<TypeSportGroup[]> => {
  const { date, timeStatus } = params || { date: "", timeStatus: "" };
  const { data } = await axios.get(
    `/get_home_page_matches?date=${date}&time_status=${timeStatus}`
  );
  return mapGetMatchHome(data.data);
};
