import axios from "@/shared/core/axios";
import { TypeLanguage } from "../types/TypeLanguage";

export const getLanguages = async (): Promise<TypeLanguage[]> => {
  const { data } = await axios.get("/get_languages  ");
  return data.data;
};
