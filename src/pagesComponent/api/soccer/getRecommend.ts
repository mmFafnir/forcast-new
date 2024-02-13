import clientAxios from "@/shared/core/axios";
import { TypeMatch } from "@/shared/types/match";
import axios from "axios";

interface IParams {
  id: string | number;
  league?: boolean;
  country?: boolean;
}
export const getRecommend = async (params: IParams) => {
  const { id, league = false, country = false } = params;
  try {
    const { data } = await clientAxios.get(
      `more_match_for_game?game_id=${id}&league=${league}&country=${country}`
    );
    console.log(data);
    return data.data.data;
  } catch (error) {
    return [];
  }
};

interface IParamsServer extends IParams {
  token?: string;
}
export const getRecommendServer = async (
  params: IParamsServer
): Promise<TypeMatch[]> => {
  const { id, league = true, country = true, token = "" } = params;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const { data } = await axios.get(
      `https://admin.aibetguru.com/api/app/more_match_for_game?game_id=${id}&league=${league}&country=${country}`,
      config
    );

    return data.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
