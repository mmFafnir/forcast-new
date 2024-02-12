import axios from "@/shared/core/axios";
import { IFetchDataCountries } from "../types/TypeCountry";

export const getCountries = async (
  url: string
): Promise<IFetchDataCountries> => {
  console.log(url);
  const { data } = await axios.get(url);
  return data.data;
};
