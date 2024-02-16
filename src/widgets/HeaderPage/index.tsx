"use client";
import { FilterCalendar, Filters } from "@/features/filters";
import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
interface IProps {
  title: string;
  calendar?: boolean;
  filtersRender?: ReactNode;
}

const HeaderPage: FC<IProps> = ({ title, calendar = true, filtersRender }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div className={`flex jc-between ${styles.filter}`}>
        {filtersRender ? filtersRender : <Filters />}

        {calendar && <FilterCalendar />}
      </div>
    </>
  );
};

export default HeaderPage;
