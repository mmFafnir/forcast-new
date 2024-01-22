"use client";
import Button from "@/shared/UI/Button";
import FilterCalendar from "./FilterCalendar";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypeTimeStatus, setTimeStatus } from "../slice/filterSlice";
import styles from "../styles/filters.module.scss";

interface TypeFilter {
  label: string;
  value: TypeTimeStatus;
}

export const Filters = () => {
  const dispatch = useTypeDispatch();
  const { timeStatus } = useTypeSelector((state) => state.filters);

  const onChangeStatus = (status: TypeTimeStatus) =>
    dispatch(setTimeStatus(status));

  const filters: TypeFilter[] = [
    {
      label: "ВСЕ",
      value: "",
    },
    {
      label: "ПРЕДСТОЯЩИЕ",
      value: 0,
    },
    {
      label: "LIVE",
      value: 1,
    },
    {
      label: "ЗАВЕРШЕННЫЕ",
      value: 3,
    },
  ];

  return (
    <div className="flex jc-between">
      <div className={`${styles.list} flex`}>
        {filters.map((filter) => (
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
