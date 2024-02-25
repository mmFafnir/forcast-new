import axiosClient from "@/shared/core/axios";

import axios from "axios";
import { IFetchMatch } from "../../types/IFetchMatch";
import { TypeTimeStatus } from "@/features/filters";

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

interface IParams {
  date: string;
  timeStatus: TypeTimeStatus;
  country?: string;
  league?: string;
  utcId: number | "";
}

export const getMatchSoccer = async (
  params?: IParams
): Promise<IFetchMatch> => {
  try {
    const {
      date,
      timeStatus,
      country = "",
      league = "",
      utcId = "",
    } = params || {
      date: "",
      timeStatus: "",
      country: "",
      league: "",
      utcId: "",
    };
    const { data } = await axiosClient.get(
      `/get_matches?start_date=${date}&time_status=${timeStatus}&country_cc=${country}&league_url=${league}&sport_id=1&utc_id=${utcId}`
    );
    return { data: data.data };
  } catch (error) {
    return defaultRes;
  }
};

interface IIParamsServer extends IParams {
  token: string;
}

export const getMatchSoccerServer = async (
  params?: IIParamsServer
): Promise<IFetchMatch> => {
  try {
    const {
      date,
      timeStatus,
      token,
      country = "",
      league = "",
      utcId = "",
    } = params || {
      date: "",
      timeStatus: "",
      token: "",
      country: "",
      league: "",
      utcId: "",
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(
      `https://admin.aibetguru.com/api/app/get_matches?start_date=${date}&time_status=${timeStatus}&country_url=${country}&league_url=${league}&sport_id=1&utc_id=${utcId}`,
      config
    );
    const res: IFetchMatch = {
      data: data.data,
    };

    if (data.request_sport) {
      res.sport = {
        title: data.request_sport.name,
        id: data.request_sport.id,
        url: data.request_sport.url,
      };
    }
    if (data.request_country) {
      res.country = {
        title: data.request_country.translation || data.request_country.name,
        url: data.request_country.url,
        id: data.request_country.id,
      };
    }
    if (data.request_league) {
      res.league = {
        title: data.request_league?.league_name,
        url: data.request_league.url,
        id: data.request_league.id,
      };
    }
    return res;
  } catch (error) {
    console.log(error);
    return defaultRes;
  }
};
