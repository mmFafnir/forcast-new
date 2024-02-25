import dayJs from "@/shared/core/dayjs";
import { timezoneData } from "../core/timezone";

export const getTimezone = (utcId?: string) => {
  const utcCount = dayJs().utcOffset() / 60;
  if (utcId && utcId?.length !== 0) {
    const userTimezone = timezoneData.find((time) => String(time.id) === utcId);
    return userTimezone;
  } else {
    const utc = `UTC${utcCount > 0 ? "+" : "-"}${utcCount}`;
    const userTimezone = timezoneData.find((time) => time.utc === utc);
    return userTimezone;
  }
};
