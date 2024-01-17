import axios from "@/shared/core/axios";
import { IFetchMatch } from "../types/IFetchMatch";

interface IParams {
  date: string;
}
export const getMatchSoccer = async (
  params?: IParams
): Promise<IFetchMatch> => {
  const { date } = params || { date: "" };
  const { data } = await axios.get(`/get_matches?date=${date}`);
  return data.data;
};
