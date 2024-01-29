import axios from "@/shared/core/axios";
import { IFetchMatch } from "../../types/IFetchMatch";
import { TypeTimeStatus } from "@/features/filters";

interface IParams {
  date: string;
  timeStatus: TypeTimeStatus;
}

const defaultRes = {
  current_page: 0,
  first_page_url: "",
  from: 0,
  next_page_url: null,
  path: "",
  per_page: 0,
  prev_page_url: null,
  to: 0,
  data: [],
};

export const getMatchSoccer = async (
  params?: IParams
): Promise<IFetchMatch> => {
  try {
    const { date, timeStatus } = params || { date: "", timeStatus: "" };
    const { data } = await axios.get(
      `/get_matches?start_date=${date}&time_status=${timeStatus}`
    );
    console.log(data);
    return { data: data.data };
  } catch (error) {
    console.log(error);
    return defaultRes;
  }
};
