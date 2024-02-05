import { TypeTimeStatus } from "@/features/filters";
import TypeSportGroup from "@/pagesComponent/types/TypeSportGroup";
import axios from "axios";
import { mapGetMatchHome } from "../main/mapGetMatchHome";

interface IParams {
  timeStatus: TypeTimeStatus;
  token?: string;
}
export const getFavoritesServer = async (
  params?: IParams
): Promise<TypeSportGroup[]> => {
  try {
    const { timeStatus, token } = params || {
      timeStatus: "",
      token: "",
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(
      `/get_user_favorite?time_status=${timeStatus}`,
      config
    );
    return mapGetMatchHome(data.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};
