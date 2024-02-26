import React, { useEffect, useState } from "react";
import { useTypeSelector } from "./useTypeSelector";
import dayJs from "@/shared/core/dayjs";
import { matchTimeZone } from "../core/timezone";
import { convertUtcOffsetToDate } from "../helper/convertUtcOffsetToDate";
import { getTimezone } from "../helper/getTimezone";

interface ITimeState {
  date: string;
  hours: string;
}

const useTimeUtc = (matchTime: string) => {
  //   @ts-ignore
  const timeDefaultTimezone = dayJs.tz(matchTime, matchTimeZone);
  const { timezone, utcId } = useTypeSelector((state) => state.timezone);
  console.log(matchTime);
  const [time, setTime] = useState<ITimeState>({
    date: convertUtcOffsetToDate(
      getTimezone(String(utcId))?.utc || "UTC+3",
      matchTime
    ).format("YYYY-MM-DD"),
    // @ts-ignore
    hours: convertUtcOffsetToDate(
      getTimezone(String(utcId))?.utc || "UTC+3",
      matchTime
    ).format("HH:mm"),
  });

  useEffect(() => {
    console.log(timezone);
    const timezoneTime = dayJs
      // @ts-ignore
      .utc(timeDefaultTimezone)
      .tz(timezone);

    const utc = getTimezone(String(utcId))?.utc || "UTC+3";
    const utcTime = convertUtcOffsetToDate(utc, matchTime);

    setTime({
      // @ts-ignore
      date: utcTime.format("YYYY-MM-DD"),
      // @ts-ignore
      hours: utcTime.format("HH:mm"),
    });
  }, [timezone]);

  return time;
};

export default useTimeUtc;
