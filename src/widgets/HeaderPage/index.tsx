"use client";
import { FilterCalendar, Filters } from "@/features/filters";
import { FC } from "react";
import styles from "./styles.module.scss";
interface IProps {
  title: string;
  calendar?: boolean;
}

const HeaderPage: FC<IProps> = ({ title, calendar = true }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div className={`flex jc-between ${styles.filter}`}>
        <Filters />
        {calendar && <FilterCalendar />}
      </div>
    </>
  );
};

export default HeaderPage;
