import axios from "axios";
import { TypePrem } from "../types/TypePrem";

export const getPremium = async (): Promise<TypePrem[]> => {
  const { data } = await axios.get("/rate_details?rate_id=9");
  return data.data;
};
