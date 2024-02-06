import axios from "@/shared/core/axios";

export const getRisks = async () => {
  const { data } = await axios.get("/get_risk");
  return data.data;
};
