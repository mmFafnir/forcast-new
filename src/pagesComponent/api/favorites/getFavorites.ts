import { TypeTimeStatus } from "@/features/filters";
import axios from "axios";
import { mapGetMatchHome } from "../main/mapGetMatchHome";
import { TypeSportGroup } from "@/shared/types/sport";

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
      "Cache-Control": "no-cache",
    };

    const { data } = await axios.get(
      `/get_user_favorite?time_status=${timeStatus}&timestamp=${new Date().getTime()}`,
      config
    );
    return mapGetMatchHome(data.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};
