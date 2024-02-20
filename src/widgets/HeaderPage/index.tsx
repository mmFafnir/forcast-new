"use client";
import { FilterCalendar, Filters } from "@/features/filters";
import { CSSProperties, FC, ReactNode } from "react";
import styles from "./styles.module.scss";
interface IProps {
  title: string;
  calendar?: boolean;
  filtersRender?: ReactNode;
  filterStyle?: CSSProperties;
}

const HeaderPage: FC<IProps> = ({
  title,
  calendar = true,
  filtersRender,
  filterStyle = {},
}) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div style={filterStyle} className={`flex jc-between  ${styles.filter}`}>
        {filtersRender ? filtersRender : <Filters />}
        {calendar && <FilterCalendar />}
      </div>
    </>
  );
};

export default HeaderPage;
