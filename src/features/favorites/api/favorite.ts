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
