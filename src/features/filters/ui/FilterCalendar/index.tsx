"use client";

import { FC, memo, useEffect, useState } from "react";
import styles from "../../styles/calendar.module.scss";
import Calendar from "react-calendar";
import Button from "./Button";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { setDate } from "../../slice/filterSlice";
import useQuery from "@/shared/hooks/useQuery";
import { usePathname } from "next/navigation";
import { parseQueryParams } from "@/shared/helper/parseQueryParams";
import dayJs from "@/shared/core/dayjs";
import { matchTimeZone } from "@/shared/core/timezone";
export const minDate = "2001-12-12";
export const maxDate = "2030-12-12";

interface IProps {
  titleClass?: string;
  bodyClass?: string;
  startDate?: string;
}
const FilterCalendarMemo: FC<IProps> = ({
  titleClass = "",
  bodyClass = "",
  startDate,
}) => {
  const pathname = usePathname();
  const dispatch = useTypeDispatch();

  const { timezone } = useTypeSelector((state) => state.timezone);
  const { timeStatus, date } = useTypeSelector((state) => state.filters);
  const { setQuery, deleteQuery } = useQuery();

  const [currentDate, setCurrentDate] = useState<string>(startDate || date);
  const [defaultDate, setDefaultDate] = useState<string>(
    // @ts-ignore
    new Date(dayJs().utc().tz(matchTimeZone).format())
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setDay = (day: string) => {
    const date = dayjs(day).format("YYYY-MM-DD");
    setQuery({ name: "date", value: date });
    dispatch(setDate(date));
    setCurrentDate(date);
    // @ts-ignore
    if (date === dayJs().utc().tz(timezone).format("YYYY-MM-DD")) {
      deleteQuery("date");
      return;
    }
  };

  const onChange = (value: any) => setDay(value);
  useEffect(() => {
    if (!startDate) return;
    console.log(currentDate);
    dispatch(setDate(startDate));
  }, []);

  useEffect(() => {
    const date = parseQueryParams(window.location.search).date;
    dispatch(setDate(date ? date : dayjs().format("YYYY-MM-DD")));
  }, [pathname]);

  useEffect(() => {
    setDefaultDate(
      // @ts-ignore
      dayJs().utc().tz(timezone).format("YYYY-MM-DD")
    );
  }, [timezone]);

  if (timeStatus === 1) return <></>;
  return (
    <div className={`${styles.body} ${bodyClass}`}>
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
        tileClassName={({ date, view, activeStartDate }) => {
          if (dayjs(date).format("YYYY-MM-DD") === defaultDate) {
            return "react-calendar__utc--now";
          }
        }}
        value={new Date(currentDate)}
      />
    </div>
  );
};
export const FilterCalendar = memo(FilterCalendarMemo);
