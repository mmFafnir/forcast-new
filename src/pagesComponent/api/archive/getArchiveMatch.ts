import { IFetchArchive } from "@/pagesComponent/types/IFetchArchiv";
import { baseUrl } from "@/shared/core/axios";
import axios from "axios";

interface IParams {
  leagueId: number | "";
  countryId: number | "";
  sportId: number | "";
  date: string | "";
}
export const getArchive = async (params: IParams) => {};

interface IParamsServer {
  token: string;
  date: string;
}

const defaultRes:IFetchArchive = {
  current_page: 1,
  data: [],
  first_page_url: "",
  from: 0,
  last_page: 0,
  last_page_url: null,
  links: [],
  next_page_url: null,
  path: "",
  per_page: 0,
  prev_page_url: null,
  to: 0,
  total: 0,
};

export const getArchiveServer = async (
  params: IParamsServer
): Promise<IFetchArchive> => {
  const { date, token } = params;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const { data } = await axios.get(
      `${baseUrl}/archive_game?date=${date}`,
      config
    );

    return data.data;
  } catch (error) {
    console.log(error);
    return defaultRes;
  }
};