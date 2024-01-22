import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import axios from "@/shared/core/axios";

export const getOneMatch = async (url: string): Promise<IFetchFullMatch> => {
  const { data } = await axios.get(`/single_page_match/ru/soccer/${url}`);
  return data.data;
};
