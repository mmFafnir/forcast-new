"use client";

import { FC, useEffect, useState } from "react";
import Slider from "rc-slider";
import styles from "../../styles/range.module.scss";
import "rc-slider/assets/index.css";
import { TypePrem } from "../../types/TypePrem";

interface IProps {
  data: TypePrem[];
  setValue: (value: TypePrem) => void;
}
export const Range: FC<IProps> = ({ data, setValue }) => {
  const [value, setValues] = useState<TypePrem>(data[0]);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div className={styles.body}>
      <Slider
        railStyle={{
          background:
            "linear-gradient(270deg, #65C03A 0%, #D6CF37 50%, #DF2674 100%)",
        }}
        max={data.length - 1}
        min={0}
        dots={true}
        onChange={(val) => setValues(data[val as number])}
        trackStyle={{
          background: "transparent",
        }}
        className="range-slider"
      />
    </div>
  );
};
//  100 lenght index
// index * lenght / lengt
