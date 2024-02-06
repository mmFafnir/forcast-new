import axios from "@/shared/core/axios";
import TypeSportGroup from "../../types/TypeSportGroup";
import { mapGetMatchHome } from "./mapGetMatchHome";
import { TypeTimeStatus } from "@/features/filters";

interface IParams {
  date: string;
  timeStatus: TypeTimeStatus;
}
export const getMatchHome = async (
  params?: IParams
): Promise<TypeSportGroup[]> => {
  try {
    const { date, timeStatus } = params || { date: "", timeStatus: "" };
    const { data } = await axios.get(
      `/get_home_page_matches?date=${date}&time_status=${timeStatus}`
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

export const getMatchMainServer = async (
  params?: IIParamsServer
): Promise<TypeSportGroup[]> => {
  try {
    const { date, timeStatus, token } = params || {
      date: "",
      timeStatus: "",
      token: "",
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(
      `https://admin.aibetguru.com/api/app/get_home_page_matches?date=${date}&time_status=${timeStatus}`,
      config
    );

    return mapGetMatchHome(data.data);
  } catch (error) {
    return [];
  }
};
