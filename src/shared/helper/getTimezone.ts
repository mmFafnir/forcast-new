import dayJs from "@/shared/core/dayjs";
import { matchTimeZone, timezoneData } from "../core/timezone";

export const getTimezone = (utcId?: string) => {
  if (utcId && utcId?.length !== 0) {
    const userTimezone = timezoneData.find((time) => String(time.id) === utcId);
    return userTimezone;
  } else {
    const userTimezone = timezoneData.find((time) => time.id == 3);
    return userTimezone;
  }
};

interface IPramsTransform {
  date?: string;
  timezone?: string | null;
  format?: string;
}
export const transformDateToTimezone = (params?: IPramsTransform) => {
  const { date, timezone, format } = params || {};

  return (
    dayJs(date)
      // @ts-ignore
      .utc()
      .tz(timezone || matchTimeZone)
      .format(format || "YYYY-MM-DD HH:mm:ss")
  );
};
