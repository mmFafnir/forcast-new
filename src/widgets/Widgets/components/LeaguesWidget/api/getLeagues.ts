import axios from "@/shared/core/axios";
import { IFetchLeague } from "../types/TypeLeague";

export const getLeagues = async (): Promise<IFetchLeague[]> => {
  const { data } = await axios.get("/get_league");
  return data.data.data;
};
