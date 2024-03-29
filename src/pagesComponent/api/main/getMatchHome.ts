import axios from "@/shared/core/axios";
import { mapGetMatchHome } from "./mapGetMatchHome";
import { TypeTimeStatus } from "@/features/filters";
import { TypeSportGroup } from "@/shared/types/sport";
import { cache } from "react";

interface IParams {
  date: string;
  timeStatus: TypeTimeStatus;
  utcId: number | "";
}
export const getMatchHome = async (
  params?: IParams
): Promise<TypeSportGroup[]> => {
  try {
    const { date, timeStatus, utcId } = params || {
      date: "",
      timeStatus: "",
      utcId: "",
    };
    const { data } = await axios.get(
      `/get_home_page_matches?date=${date}&time_status=${timeStatus}&utc_id=${utcId}`
    );
    return mapGetMatchHome(data.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

interface IIParamsServer extends IParams {
  token: string;
}

export const getMatchMainServer = cache(
  async (params?: IIParamsServer): Promise<TypeSportGroup[]> => {
    try {
      const { date, timeStatus, token, utcId } = params || {
        date: "",
        timeStatus: "",
        token: "",
        utcId: "",
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(
        `https://admin.aibetguru.com/api/app/get_home_page_matches?date=${date}&time_status=${timeStatus}&utc_id=${utcId}`,
        config
      );

      return mapGetMatchHome(data.data);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
