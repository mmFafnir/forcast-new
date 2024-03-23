import axios from "@/shared/core/axios";
import { IFetchLeague } from "../types/TypeLeague";

export const getLeagues = async (): Promise<IFetchLeague[]> => {
  const { data } = await axios.get("/get_league");

  console.log(data);
  return data.data;
};
