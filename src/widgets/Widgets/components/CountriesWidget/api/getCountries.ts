import axios from "@/shared/core/axios";
import { IFetchDataCountries } from "../types/TypeCountry";

export const getCountries = async (
  url: string
): Promise<IFetchDataCountries> => {
  console.log(url.replace("http://admin.aibetguru.com/api/app", ""));
  const { data } = await axios.get(
    url.replace("http://admin.aibetguru.com/api/app", "")
  );
  return data.data;
};
