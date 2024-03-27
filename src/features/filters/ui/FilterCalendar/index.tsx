"use client";

import { FC, memo, useEffect, useState } from "react";
import styles from "../../styles/calendar.module.scss";
import Calendar from "react-calendar";
import Button from "./Button";
import dayjs from "dayjs";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { setDate } from "../../slice/filterSlice";
import useQuery from "@/shared/hooks/useQuery";
import { usePathname, useSearchParams } from "next/navigation";
import { parseQueryParams } from "@/shared/helper/parseQueryParams";
import dayJs from "@/shared/core/dayjs";
import "react-calendar/dist/Calendar.css";
import { parseCookies } from "nookies";
import {
  getTimezone,
  transformDateToTimezone,
} from "@/shared/helper/getTimezone";
import { convertUtcOffsetToDate } from "@/shared/helper/convertUtcOffsetToDate";
import useHydration from "@/shared/hooks/useHydration";

export const minDate = "2001-12-12";
export const maxCurrentDate = "2030-12-12";

interface IProps {
  titleClass?: string;
  bodyClass?: string;
  startDate?: string | null;
  max?: string | null;
}
const FilterCalendarMemo: FC<IProps> = ({
  titleClass = "",
  bodyClass = "",
  startDate,
  max,
}) => {
  const searchParams = useSearchParams();
  const cookies = parseCookies();
  const pathname = usePathname();
  const dispatch = useTypeDispatch();

  const { isMounted } = useHydration();

  const { timezone, utcId } = useTypeSelector((state) => state.timezone);
  const { timeStatus, date, loading } = useTypeSelector(
    (state) => state.filters
  );
  const { setQuery, deleteQuery, query } = useQuery("date");

  const [maxDate, setMaxDate] = useState<string>(max || maxCurrentDate);
  const [currentDate, setCurrentDate] = useState<string>(
    searchParams.get("date") || startDate || date
  );
  const [defaultDate, setDefaultDate] = useState<string>(
    // @ts-ignores
    new Date(transformDateToTimezone({ timezone: cookies.timezone }))
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setDay = (day: string) => {
    const date = dayjs(day).format("YYYY-MM-DD");
    const todayStartDay =
      startDate &&
      dayJs(
        convertUtcOffsetToDate(
          getTimezone(String(utcId))?.utc || "UTC+3",
          startDate
        )
      ).format("YYYY-MM-DD");

    const today =
      todayStartDay ||
      dayJs(transformDateToTimezone({ timezone })).format("YYYY-MM-DD");

    if (date === today) {
      deleteQuery("date");
    } else {
      setQuery({ name: "date", value: date });
    }

    setCurrentDate(date);
    dispatch(setDate(date));
  };

  const onChange = (value: any) => setDay(value);

  useEffect(() => {
    if (pathname == "/archive") return;
    const date = parseQueryParams(window.location.search).date;

    const currentDay = date
      ? date
      : // @ts-ignore
        dayJs().utc().tz(timezone).format("YYYY-MM-DD");

    setCurrentDate(currentDay);
    dispatch(setDate(currentDay));
  }, [pathname]);

  useEffect(() => {
    setDefaultDate(transformDateToTimezone({ timezone }));

    if (!max) return;
    const utc = getTimezone(String(utcId));
    const date = convertUtcOffsetToDate(utc?.utc || "UTC+3", max);
    setMaxDate(dayJs(date).format("YYYY-MM-DD"));
  }, [timezone]);

  useEffect(() => {
    console.log(searchParams);
    if (pathname == "/archive") {
      const date = searchParams.get("date");
      if (!date) return;
      setCurrentDate(date);
      dispatch(setDate(date));
    }
  }, [searchParams]);

  useEffect(() => {
    if (!startDate || query) return;
    dispatch(setDate(dayJs(startDate).format("YYYY-MM-DD")));
  }, []);

  if (timeStatus === 1) return <></>;
  return (
    <div
      className={`${styles.body} ${bodyClass} ${
        loading ? styles.eventNone : ""
      }`}
    >
      <Button
        className={titleClass}
        setDay={setDay}
        day={currentDate}
        setIsOpen={setIsOpen}
      />
      <Calendar
        locale="ru"
        className={isOpen ? "calendar-open" : ""}
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        onChange={onChange}
        tileClassName={({ date }) => {
          if (
            dayjs(date).format("YYYY-MM-DD") ===
            dayJs(defaultDate).format("YYYY-MM-DD")
          ) {
            return isMounted ? "react-calendar__utc--now" : "";
          }
        }}
        value={new Date(currentDate)}
      />
    </div>
  );
};
export const FilterCalendar = memo(FilterCalendarMemo);
