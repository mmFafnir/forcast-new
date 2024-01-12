import React from "react";
import styles from "../styles/filters.module.scss";
import Button from "@/shared/UI/Button";
import { filters } from "../consts/filtes";
import FilterCalendar from "./FilterCalendar";

export const Filters = () => {
  return (
    <div className="jc-between">
      <div className={`${styles.list} flex`}>
        {filters.map((filter) => (
          <Button
            key={filter.label}
            type="text"
            active={filter.value === "all"}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <FilterCalendar />
    </div>
  );
};
