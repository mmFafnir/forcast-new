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

export const minDate = "2001-12-12";
export const maxDate = "2030-12-12";

interface IProps {
  titleClass?: string;
  bodyClass?: string;
}
const FilterCalendarMemo: FC<IProps> = ({
  titleClass = "",
  bodyClass = "",
}) => {
  const pathname = usePathname();

  const dispatch = useTypeDispatch();
  const { timeStatus, date } = useTypeSelector((state) => state.filters);
  const { setQuery, deleteQuery } = useQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setDay = (day: string) => {
    const date = dayjs(day).format("YYYY-MM-DD");
    setQuery({ name: "date", value: date });
    dispatch(setDate(date));
    if (date === dayjs().format("YYYY-MM-DD")) {
      deleteQuery("date");
      return;
    }
  };

  const onChange = (value: any) => setDay(value);

  useEffect(() => {
    const date = parseQueryParams(window.location.search).date;
    dispatch(setDate(date ? date : dayjs().format("YYYY-MM-DD")));
  }, [pathname]);

  if (timeStatus === 1) return <></>;
  return (
    <div className={`${styles.body} ${bodyClass}`}>
      <Button
        className={titleClass}
        setDay={setDay}
        day={date}
        setIsOpen={setIsOpen}
      />
      <Calendar
        locale="ru"
        className={isOpen ? "calendar-open" : ""}
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        onChange={onChange}
        value={new Date(date)}
      />
    </div>
  );
};

export const FilterCalendar = memo(FilterCalendarMemo);
