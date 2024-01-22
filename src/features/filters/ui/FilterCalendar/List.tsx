import React, { FC, useEffect, useState } from "react";
import styles from "../../styles/calendar.module.scss";
import { getArrayDate } from "../../scripts/gerArrayDate";
import dayjs from "dayjs";

const dates = getArrayDate();
const todayDate = dayjs("2023-11-03").format("YYYY-MM-DD");

interface IProps {
  value: string;
  setValue: (value: string) => void;
}
const List: FC<IProps> = ({ value, setValue }) => {
  const [currentValue, setCurrentValue] = useState<string>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className={styles.list}>
      {dates.map((date) => (
        <button
          className={currentValue === date ? styles.active : ""}
          key={date}
          onClick={() => setValue(date)}
        >
          {date === todayDate ? "Сегодня" : dayjs(date).format("DD/MM")}
        </button>
      ))}
    </div>
  );
};

export default List;
