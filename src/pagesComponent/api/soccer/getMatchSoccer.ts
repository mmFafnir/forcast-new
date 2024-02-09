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
    } = params || { date: "", timeStatus: "", country: "", league: "" };
    const { data } = await axiosClient.get(
      `/get_matches?start_date=${date}&time_status=${timeStatus}&country_cc=${country}&league_url=${league}`
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
    } = params || {
      date: "",
      timeStatus: "",
      token: "",
      country: "",
      league: "",
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(
      `https://admin.aibetguru.com/api/app/get_matches?start_date=${date}&time_status=${timeStatus}&country_cc=${country}&league_url=${league}`,
      config
    );
    let title = null;
    if (data.request_country) {
      title = data.request_country.translation || data.request_country.name;
    }
    if (data.request_league) {
      title = data.request_league?.league_name;
    }
    return {
      data: data.data,
      title: title,
    };
  } catch (error) {
    console.log(error);
    return defaultRes;
  }
};
