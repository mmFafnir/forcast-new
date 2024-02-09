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

export const minDate = "2001-12-12";
export const maxDate = "2030-12-12";

const FilterCalendarMemo: FC = () => {
  const dispatch = useTypeDispatch();
  const { timeStatus, date } = useTypeSelector((state) => state.filters);
  const { setQuery, deleteQuery } = useQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setDay = (day: string) => {
    const date = dayjs(day).format("YYYY-MM-DD");
    dispatch(setDate(date));
    if (date === dayjs().format("YYYY-MM-DD")) {
      deleteQuery("date");
      return;
    }
    setQuery({ name: "date", value: date });
  };

  const onChange = (value: any) => setDay(value);

  useEffect(() => {
    console.log("mount");
    // dispatch(setDate(dayjs().format("YYYY-MM-DD")));
  }, []);

  if (timeStatus === 1) return <></>;
  return (
    <div className={styles.body}>
      <Button setDay={setDay} day={date} setIsOpen={setIsOpen} />
      <Calendar
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
