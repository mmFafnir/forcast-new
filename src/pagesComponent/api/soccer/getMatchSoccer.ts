import axios from "@/shared/core/axios";
import { IFetchMatch } from "../../types/IFetchMatch";

interface IParams {
  date: string;
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
    const { date } = params || { date: "" };
    const { data } = await axios.get(
      `/get_matches?start_date=${date}&end_date=${date}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return defaultRes;
  }
};
