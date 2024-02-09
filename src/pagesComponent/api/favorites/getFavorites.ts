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
