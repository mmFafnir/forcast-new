import dayJs from "@/shared/core/dayjs";
import { timezoneData } from "../core/timezone";

export const getTimezone = (utcId?: string) => {
  if (utcId && utcId?.length !== 0) {
    const userTimezone = timezoneData.find((time) => String(time.id) === utcId);
    return userTimezone;
  } else {
    const utcCount = dayJs(new Date()).utcOffset() / 60;
    const utc = `UTC${utcCount >= 0 ? "+" : "-"}${utcCount}`;
    console.log(utc);
    const userTimezone = timezoneData.find((time) => time.utc === utc);
    return userTimezone;
  }
};
