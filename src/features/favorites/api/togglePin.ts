import axios from "@/shared/core/axios";

export const togglePin = async (id: number): Promise<0 | 1> => {
  const { data } = await axios.post("/user_add_league_in_pind", {
    league_id: id,
  });
  return data.variant;
};
