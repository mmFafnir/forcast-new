"use client";
import Image from "next/image";
import styles from "../styles/country.module.scss";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import { useRef } from "react";
import { League } from "./League";

const iconStyles: IAccordionStylesIcon = {
  open: { transform: "scale(1, -1)" },
  close: {},
};

export const Country = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { iconStyle, onToggle, currentHeight } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
    offResizeObserver: true,
  });

  return (
    <div className={styles.item}>
      <div className={styles.header} onClick={onToggle}>
        <div className={styles.country}>
          <Image
            src={"/country-icon.svg"}
            width={16}
            height={16}
            className="logo-icon"
            alt="Название страны"
          />
          <p className={styles.itemName}>Название страны</p>
        </div>
        <span style={iconStyle}>
          <IconArrow />
        </span>
      </div>
      <div className={styles.body} style={{ height: currentHeight + "px" }}>
        <div ref={listRef}>
          {new Array(4).fill(null).map((item, index) => (
            <League key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
