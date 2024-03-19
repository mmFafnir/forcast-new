"use client";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypeTimeStatus, setTimeStatus } from "../slice/filterSlice";
import styles from "../styles/filters.module.scss";
import { useEffect, useState } from "react";
import { filters } from "../consts/filtes";
import { FilterMobile } from "./FilterMobile";
import { usePathname } from "next/navigation";

export const Filters = () => {
  const dispatch = useTypeDispatch();
  const pathname = usePathname();
  const [value, setValue] = useState<TypeTimeStatus>("");

  const [isMob, setIsMob] = useState<boolean>(false);

  const onChangeStatus = (status: TypeTimeStatus) => {
    dispatch(setTimeStatus(status));
    setValue(status);
  };

  useEffect(() => {
    dispatch(setTimeStatus(""));
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 750) return setIsMob(true);
      setIsMob(false);
    });
    if (window.innerWidth <= 750) setIsMob(true);
  }, []);

  return (
    <>
      {isMob && <FilterMobile />}
      <div className={`${styles.list} flex`}>
        {!isMob &&
          filters.map((filter) => (
            <Button
              key={filter.label}
              type="text"
              active={filter.value === value}
              onClick={() => onChangeStatus(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
      </div>
    </>
  );
};
