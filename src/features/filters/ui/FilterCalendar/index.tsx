"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/calendar.module.scss";
import Calendar from "react-calendar";
import Button from "./Button";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { setDate } from "../../slice/filterSlice";

export const minDate = "2001-12-12";
export const maxDate = "2030-12-12";

export const FilterCalendar = () => {
  const dispatch = useTypeDispatch();
  const { timeStatus } = useTypeSelector((state) => state.filters);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setDay = (day: string) => setCurrentDate(new Date(day));

  const onChange = (value: any) => {
    setCurrentDate(value);
  };

  useEffect(() => {
    dispatch(setDate(dayjs(currentDate).format("YYYY-MM-DD")));
  }, [currentDate]);

  if (timeStatus === 1) return <></>;
  return (
    <div className={styles.body}>
      <Button
        setDay={setDay}
        day={dayjs(currentDate).format("YYYY-MM-DD")}
        setIsOpen={setIsOpen}
      />
      <Calendar
        className={isOpen ? "calendar-open" : ""}
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        onChange={onChange}
        value={currentDate}
      />
    </div>
  );
};
