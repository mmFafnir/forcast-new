import axios from "@/shared/core/axios";
import { TypeTimezone } from "../types/TypeTimezone";

export const getTimezone = async (): Promise<TypeTimezone[]> => {
  try {
    const { data } = await axios.get("/get_timezones");
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
