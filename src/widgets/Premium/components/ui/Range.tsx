import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "../../styles/range.module.scss";

export const Range = () => {
  const [value, setValues] = useState<number>(1);
  return (
    <div className={styles.body}>
      {new Array(7).fill(null).map((point, index) => (
        <div
          key={index}
          style={{ left: `calc(${(100 / 7) * index + 1}% + 19px)` }}
          className={styles.point}
        ></div>
      ))}
      <Slider
        railStyle={{
          background:
            "linear-gradient(270deg, #65C03A 0%, #D6CF37 50%, #DF2674 100%)",
        }}
        // value={}
        defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        max={30}
        min={1}
        onChange={(val) => console.log(val)}
        trackStyle={{
          background: "transparent",
        }}
        className="range-slider"
      />
    </div>
  );
};
