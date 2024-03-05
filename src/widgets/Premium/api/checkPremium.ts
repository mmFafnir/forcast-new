import axios from "axios";

export const checkPremium = async (code: string) => {
  const { data } = await axios.post("/validation_promo_code", { code });
  return data;
};
