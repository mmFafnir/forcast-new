"use client";
import React, { useState } from "react";
import styles from "../../styles/calendar.module.scss";
import Button from "./Button";
import List from "./List";
import { getArrayDate } from "../../scripts/gerArratDate";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");
const FilterCalendar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(today);
  getArrayDate();
  return (
    <div className={`${styles.body} ${isOpen ? styles.open : ""}`}>
      <Button setIsOpen={setIsOpen} day={value} setDay={setValue} />
      <List setValue={setValue} value={value} />
    </div>
  );
};

export default FilterCalendar;
