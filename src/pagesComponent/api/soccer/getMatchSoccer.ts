import axiosClient from "@/shared/core/axios";

import axios from "axios";
import { IFetchMatch } from "../../types/IFetchMatch";
import { TypeTimeStatus } from "@/features/filters";

interface IParams {
  date: string;
  timeStatus: TypeTimeStatus;
}

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

export const getMatchSoccer = async (
  params?: IParams
): Promise<IFetchMatch> => {
  try {
    const { date, timeStatus } = params || { date: "", timeStatus: "" };
    const { data } = await axiosClient.get(
      `/get_matches?start_date=${date}&time_status=${timeStatus}`
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
    const { date, timeStatus, token } = params || {
      date: "",
      timeStatus: "",
      token: "",
      country_code: "",
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(
      `https://admin.aibetguru.com/api/app/get_matches?start_date=${date}&time_status=${timeStatus}`,
      config
    );

    return { data: data.data };
  } catch (error) {
    return defaultRes;
  }
};
