import axios from "@/shared/core/axios";

export const sendGetAnalysis = async (matchId: number) => {
  const { data } = await axios.post("/send_match_for_get_analize", {
    match_id: matchId,
  });

  return data;
};
