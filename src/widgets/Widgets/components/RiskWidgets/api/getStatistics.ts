import { TypeTimeStatus } from "@/features/filters";
import axios from "@/shared/core/axios";

interface IParams {
  date: string;
  time_status?: TypeTimeStatus;
  league_id?: number | "";
  sport_id?: number | "";
  country_id?: number | "";
  risk_id: number | string;
}
export const getStatistics = async (params: IParams) => {
  const {
    date = "",
    time_status = "",
    league_id = "",
    sport_id = "",
    country_id = "",
    risk_id,
  } = params;

  const { data } = await axios.get(
    `get_statistics?date=${date}&risk_id=${risk_id}&time_status=${time_status}&league_id=${league_id}&sport_id=${sport_id}&country_id=${country_id}`
  );
  return data.data;
};
