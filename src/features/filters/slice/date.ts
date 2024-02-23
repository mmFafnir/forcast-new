import { parseQueryParams } from "@/shared/helper/parseQueryParams";
import dayJs from "@/shared/core/dayjs";
import { matchTimeZone } from "@/shared/core/timezone";

export const date =
  (typeof window !== "undefined" &&
    parseQueryParams(window.location.search).date) ||
  // @ts-ignore
  dayJs().utc().tz(matchTimeZone).format("YYYY-MM-DD");
