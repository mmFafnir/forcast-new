"use client";

import { FC, useEffect, useState } from "react";
import Slider from "rc-slider";
import styles from "../../styles/range.module.scss";
import "rc-slider/assets/index.css";

const arrayDays = [7, 15, 30, 90, 180, 365];
interface IProps {
  setDay: (day: number) => void;
}
export const Range: FC<IProps> = ({ setDay }) => {
  const [value, setValues] = useState<number>(2);

  useEffect(() => {
    setDay(arrayDays[value]);
  }, [value]);

  return (
    <div className={styles.body}>
      {arrayDays.map((point, index) => (
        <div
          key={index}
          onClick={() => setValues(index)}
          className={styles.point}
        ></div>
      ))}
      <Slider
        railStyle={{
          background:
            "linear-gradient(270deg, #65C03A 0%, #D6CF37 50%, #DF2674 100%)",
        }}
        value={value}
        max={arrayDays.length - 1}
        min={0}
        onChange={(val) => setValues(val as number)}
        trackStyle={{
          background: "transparent",
        }}
        className="range-slider"
      />
    </div>
  );
};
