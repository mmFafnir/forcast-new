import axios from "@/shared/core/axios";

export const getUser = async () => {
  const { data } = await axios.get("/auth-user-info");
  return data;
};
