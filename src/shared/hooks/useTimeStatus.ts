import { useEffect, useState } from "react";
import { useTypeSelector } from "./useTypeSelector";
import dayJs from "@/shared/core/dayjs";
import { matchTimeZone } from "../core/timezone";
import "dayjs/locale/ru";

interface IProps {
  matchTime: string;
}
const useTimeStatus = ({ matchTime }: IProps) => {
  const { timezone } = useTypeSelector((state) => state.timezone);
  const [time, setTime] = useState<{
    time: string;
    hours: string;
    status?: string;
    dateDefault?: string;
  }>({
    time: dayJs(matchTime).locale("ru").format("DD MMMM YYYY"),
    hours: dayJs(matchTime).format("HH:mm"),
    status: "",
    dateDefault: matchTime,
  });
  // @ts-ignore
  const timeDefaultTimezone = dayJs.tz(matchTime, matchTimeZone);

  const getStatusMatch = (newTime: string) => {
    const today = dayJs();
    const diff = dayJs(newTime).diff(today);

    let status = "";
    if (diff < 0) status = "finish";

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    if (totalHours < 24) {
      status = "today";
    }

    setTime({
      time: dayJs(newTime).locale("ru").format("DD MMMM YYYY"),
      hours: dayJs(newTime).format("HH:mm"),
      status: status,
      dateDefault: newTime,
    });
  };

  useEffect(() => {
    console.log(timezone);
    if (timezone.length > 0) {
      const timezoneTime = dayJs
        // @ts-ignore
        .utc(timeDefaultTimezone)
        .tz(timezone)
        .format("YYYY-MM-DD HH:mm:ss");

      getStatusMatch(timezoneTime);
    }
  }, [timezone]);

  return {
    time: time.time,
    hours: time.hours,
    status: time.status || "",
    dateDefault: time.dateDefault,
  };
};

export default useTimeStatus;
