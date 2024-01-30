"use client";
import Button from "@/shared/UI/Button";
import { FilterCalendar } from "./FilterCalendar";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypeTimeStatus, setTimeStatus } from "../slice/filterSlice";
import styles from "../styles/filters.module.scss";
import { useEffect, useState } from "react";
import { filters } from "../consts/filtes";
import { FilterMobile } from "./FilterMobile";

export const Filters = () => {
  const dispatch = useTypeDispatch();
  const { timeStatus } = useTypeSelector((state) => state.filters);

  const [isMob, setIsMob] = useState<boolean>(false);

  const onChangeStatus = (status: TypeTimeStatus) =>
    dispatch(setTimeStatus(status));

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 750) return setIsMob(true);
      setIsMob(false);
    });
    if (window.innerWidth <= 750) setIsMob(true);
  }, []);

  return (
    <div className={`flex jc-between ${styles.body}`}>
      {isMob && <FilterMobile />}
      <div className={`${styles.list} flex`}>
        {!isMob &&
          filters.map((filter) => (
            <Button
              key={filter.label}
              type="text"
              active={filter.value === timeStatus}
              onClick={() => onChangeStatus(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
      </div>
      <FilterCalendar />
    </div>
  );
};
