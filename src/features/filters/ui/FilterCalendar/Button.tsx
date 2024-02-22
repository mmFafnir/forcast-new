"use client";

import { Dispatch, FC, SetStateAction, useEffect } from "react";
import styles from "../../styles/calendar.module.scss";
import dayjs from "dayjs";
import { maxDate, minDate } from ".";

interface IPops {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  day: string;
  setDay: (date: string) => void;
  className?: string;
}

const Button: FC<IPops> = ({ setIsOpen, day, setDay, className = "" }) => {
  const openList = () => setIsOpen((prev) => !prev);

  const onNextDay = () => setDay(dayjs(day).add(1, "day").format("YYYY-MM-DD"));
  const onPrevDay = () =>
    setDay(dayjs(day).subtract(1, "day").format("YYYY-MM-DD"));

  useEffect(() => {
    const onCloseCalendar = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".react-calendar") &&
        !target.closest(`.${styles.button}`)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", onCloseCalendar);
    return () => document.removeEventListener("click", onCloseCalendar);
  }, []);

  return (
    <div className={`${styles.button} ${className}`}>
      <button
        disabled={day === minDate}
        className={styles.prev}
        onClick={onPrevDay}
      >
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.92864 0.42888L0.564675 6.79284C0.174151 7.18337 0.174151 7.81653 0.564675 8.20705L6.92864 14.571C7.31916 14.9615 7.95233 14.9615 8.34285 14.571C8.73337 14.1805 8.73337 13.5473 8.34285 13.1568L2.686 7.49995L8.34285 1.84309C8.73337 1.45257 8.73337 0.819404 8.34285 0.42888C7.95232 0.0383553 7.31916 0.0383553 6.92864 0.42888Z"
            fill="white"
          />
        </svg>
      </button>
      <button className={styles.value} onClick={openList}>
        <svg width="19" height="21" viewBox="0 0 19 21" fill="none">
          <path
            d="M16.6357 18.5H2.63574V7.5H16.6357M13.6357 0.5V2.5H5.63574V0.5H3.63574V2.5H2.63574C1.52574 2.5 0.635742 3.39 0.635742 4.5V18.5C0.635742 19.0304 0.846456 19.5391 1.22153 19.9142C1.5966 20.2893 2.10531 20.5 2.63574 20.5H16.6357C17.1662 20.5 17.6749 20.2893 18.05 19.9142C18.425 19.5391 18.6357 19.0304 18.6357 18.5V4.5C18.6357 3.96957 18.425 3.46086 18.05 3.08579C17.6749 2.71071 17.1662 2.5 16.6357 2.5H15.6357V0.5M14.6357 11.5H9.63574V16.5H14.6357V11.5Z"
            fill="white"
          />
        </svg>
        <span>{dayjs(day).format("DD/MM/YYYY")}</span>
      </button>
      <button
        disabled={day === maxDate}
        className={styles.next}
        onClick={onNextDay}
      >
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.34285 0.42888L8.70681 6.79284C9.09733 7.18337 9.09733 7.81653 8.70681 8.20705L2.34285 14.571C1.95232 14.9615 1.31916 14.9615 0.928634 14.571C0.53811 14.1805 0.53811 13.5473 0.928634 13.1568L6.58549 7.49995L0.928635 1.84309C0.538111 1.45257 0.538111 0.819404 0.928635 0.42888C1.31916 0.0383553 1.95232 0.0383553 2.34285 0.42888Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default Button;
