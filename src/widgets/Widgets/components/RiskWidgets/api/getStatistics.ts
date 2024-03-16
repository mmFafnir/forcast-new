import axios from "@/shared/core/axios";
import { IFetchStatistics, TypeStatistic } from "../types";

interface IParams {
  league_id?: number | "";
  sport_id?: number | "";
  country_id?: number | "";
}
export const getStatistics = async (
  params: IParams
): Promise<IFetchStatistics[]> => {
  const { league_id = "", sport_id = "", country_id = "" } = params;

  const { data } = await axios.get(
    `get_statistics?league_id=${league_id}&sport_id=${sport_id}&country_id=${country_id}`
  );
  let res: IFetchStatistics[] = [];

  for (const key in data.data) {
    res.push({
      key: key as string,
      item: data.data[key],
    });
  }
  return res;
};
