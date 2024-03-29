import { TypeTimeStatus } from "@/features/filters";
import axios from "@/shared/core/axios";

export const addFavorite = async (ids: number[]) => {
  try {
    const { data } = await axios.post("/add_game_in_favorite", {
      games: ids,
    });
    return data;
  } catch (error) {
    throw ids;
  }
};

export const deleteFavorite = async (ids: number[]) => {
  try {
    const { data } = await axios.post("/delete_game_in_favorite", {
      games: ids,
    });
    return data;
  } catch (error) {
    throw ids;
  }
};

export const fetchFavorites = async (timeStatus: TypeTimeStatus) => {
  try {
    const { data } = await axios.get(
      `/get_user_favorite?time_status=${timeStatus}&timestamp=${new Date().getTime()}`
    );
    return data.data;
  } catch (error) {
    return [];
  }
};
