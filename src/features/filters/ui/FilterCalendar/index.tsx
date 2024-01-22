"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/calendar.module.scss";
import Button from "./Button";
import List from "./List";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setDate } from "../../slice/filterSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

const today = dayjs("2023-11-03").format("YYYY-MM-DD");
const FilterCalendar = () => {
  const dispatch = useTypeDispatch();
  const { timeStatus } = useTypeSelector((state) => state.filters);

  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(today);

  function updateSorting(sortOrder: string) {
    if (!searchParams) return;
    setValue(sortOrder);
    if (sortOrder === dayjs("2023-11-03").format("YYYY-MM-DD")) {
      // window.history.pushState(null, "", `/`);
      dispatch(setDate(""));
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", sortOrder);
    // window.history.pushState(null, "", `?${params.toString()}`);
    dispatch(setDate(sortOrder));
  }

  useEffect(() => {
    const closeList = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.body}`)) setIsOpen(false);
    };

    document.addEventListener("click", closeList);
    return () => document.removeEventListener("click", closeList);
  }, []);

  useEffect(() => {
    if (timeStatus !== 1) return;
    updateSorting("2023-11-03");
  }, [timeStatus]);

  if (timeStatus === 1) return <></>;
  return (
    <div className={`${styles.body} ${isOpen ? styles.open : ""}`}>
      <Button setIsOpen={setIsOpen} day={value} setDay={updateSorting} />
      <List setValue={updateSorting} value={value} />
    </div>
  );
};

export default FilterCalendar;
