import axios from "axios";

export interface IResponseDate {
  games_count: number;
  get_latest_archive_game: string;
  get_game_count_home_page: string;
}

export const getGlobalData = async (): Promise<IResponseDate | null> => {
  try {
    const { data } = await axios("/get_global_data");
    return data;
  } catch (error) {
    return null;
  }
};
