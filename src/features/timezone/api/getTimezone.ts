import axios from "@/shared/core/axios";
import { TypeTimezone } from "../types/TypeTimezone";

export const getTimezone = async (): Promise<TypeTimezone[]> => {
  const { data } = await axios.get("/get_timezones");
  console.log(data);
  return data.data;
};
