"use client";

import { FC, memo, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import { TypePrem } from "../../types/TypePrem";

import imageFire from "../../images/svg/fire.svg";
import styles from "../../styles/range.module.scss";
import "rc-slider/assets/index.css";

interface IProps {
  data: TypePrem[];
  setValue: (value: TypePrem) => void;
}
const beforeStyles = {
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  width: "10px",
  height: "10px",
  background: "red",
};
const RangeMemo: FC<IProps> = ({ data, setValue }) => {
  const [value, setValues] = useState<TypePrem>(data[0]);
  const sliderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    if (!sliderRef.current) return;

    console.log(sliderRef.current);
    const dots = sliderRef.current.querySelectorAll(".rc-slider-dot");
    dots.forEach((dot, index) => {
      const rate = data[index];
      if (rate.has_top == "0") return;
      dot.classList.add(styles.pointTop);
    });
  }, []);

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
        ref={sliderRef}
        onChange={(val) => setValues(data[val as number])}
        trackStyle={{
          background: "transparent",
        }}
        className="range-slider"
      />
    </div>
  );
};

export const Range = memo(RangeMemo);
