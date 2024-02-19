import { IFetchArchive } from "@/pagesComponent/types/IFetchArchiv";
import { baseUrl } from "@/shared/core/axios";
import axios from "axios";
import clientAxios from "@/shared/core/axios";

const defaultRes: IFetchArchive = {
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

interface IParams {
  leagueId: number | "";
  countryId: number | "";
  sportId: number | "";
  date: string | "";
  page: number;
}
export const getArchive = async (params: IParams) => {
  try {
    const { leagueId, countryId, sportId, date, page } = params;
    const { data } = await clientAxios.get(
      `/archive_game?date=${date}&sport_id=${sportId}&country_id=${countryId}&league_id=${leagueId}&page=${page}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
    return defaultRes;
  }
};

interface IParamsServer {
  token: string;
  date: string;
}

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
