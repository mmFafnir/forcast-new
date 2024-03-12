"use client";

import { FC, memo, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import { TypePrem } from "../../types/TypePrem";
import { TypePromoCode } from "../../types/IFetchPromoCode";

import imageFire from "../../images/svg/fire.svg";
import imageZero from "../../images/svg/zero.svg";
import styles from "../../styles/range.module.scss";
import "rc-slider/assets/index.css";

interface IProps {
  data: TypePrem[];
  promoCode: TypePromoCode | null;
  setValue: (value: TypePrem) => void;
}

const RangeMemo: FC<IProps> = ({ data, setValue, promoCode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(
    data.findIndex((item) => item.start_tariffe == "1") >= 0
      ? data.findIndex((item) => item.start_tariffe == "1")
      : 0
  );

  const renderFreeDots = () => {
    if (!sliderRef.current) return;
    const dots = sliderRef.current.querySelectorAll(".rc-slider-dot");
    dots.forEach((dot, index) => {
      const rate = data[index];
      if (rate.free_or_not == "1") {
        dot.innerHTML = `<span class='prem-dot prem-top-dot prem-free'><img src=${imageZero.src} alt="zero icon"/></span>`;
      }
    });
  };

  const renderTopDots = () => {
    if (!sliderRef.current) return;
    const dots = sliderRef.current.querySelectorAll(".rc-slider-dot");
    dots.forEach((dot, index) => {
      const rate = data[index];
      dot.innerHTML = `<span class='prem-dot'></span>`;
      if (rate.has_top == "0") return;

      dot.classList.add(styles.pointTop);
      dot.innerHTML = `<span class='prem-dot prem-top-dot'><img src=${imageFire.src} alt="fire icon"/></span>`;
    });
  };

  useEffect(() => {
    console.log(activeIndex);
    setValue(data[activeIndex]);
    if (!sliderRef) return;
    const dots = sliderRef.current?.querySelectorAll(".rc-slider-dot");

    dots &&
      dots.forEach((dot, index) => {
        if (index == activeIndex) {
          dot.classList.add("hide");
        } else {
          dot.classList.remove("hide");
        }
      });
  }, [activeIndex]);

  useEffect(() => {
    if (promoCode && promoCode.free_tariffe == "1") {
      renderFreeDots();
    } else {
      renderTopDots();
    }
  }, [promoCode]);

  useEffect(() => {
    renderTopDots();
  }, []);

  return (
    <div className={styles.body} ref={sliderRef}>
      <Slider
        railStyle={{
          background:
            "linear-gradient(270deg, #65C03A 0%, #D6CF37 50%, #DF2674 100%)",
        }}
        max={data.length - 1}
        min={0}
        dots={true}
        value={activeIndex}
        onChange={(val) => setActiveIndex(val as number)}
        trackStyle={{
          background: "transparent",
        }}
        className="range-slider"
      />
    </div>
  );
};

export const Range = memo(RangeMemo);
