import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "../../styles/range.module.scss";

export const Range = () => {
  return (
    <div>
      <Slider
        railStyle={{
          background:
            "linear-gradient(270deg, #65C03A 0%, #D6CF37 50%, #DF2674 100%)",
        }}
        trackStyle={{
          background: "transparent",
        }}
        className="range-slider"
      />
    </div>
  );
};
