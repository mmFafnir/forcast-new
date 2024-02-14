import { TypeTimeStatus } from "@/features/filters";
import axios from "@/shared/core/axios";

interface IParams {
  league_id?: number | "";
  sport_id?: number | "";
  country_id?: number | "";
  risk_id: number | string;
}
export const getStatistics = async (params: IParams) => {
  const { league_id = "", sport_id = "", country_id = "", risk_id } = params;

  const { data } = await axios.get(
    `get_statistics?risk_id=${risk_id}&league_id=${league_id}&sport_id=${sport_id}&country_id=${country_id}`
  );
  return data.data;
};
