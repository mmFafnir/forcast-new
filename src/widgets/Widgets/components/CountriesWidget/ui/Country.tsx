"use client";
import Image from "next/image";
import styles from "../styles/country.module.scss";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import { FC, useRef } from "react";
import { League } from "./League";
import { TypeCountry } from "../types/TypeCountry";

const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: { transform: "scale(1, -1)" },
};

interface IProps {
  item: TypeCountry;
}

export const Country: FC<IProps> = ({ item }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { iconStyle, onToggle, currentHeight } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
    offResizeObserver: true,
  });

  return (
    <div className={styles.item}>
      <div className={`${styles.header} acc-hover`} onClick={onToggle}>
        <div className={styles.country}>
          <Image
            src={`https://admin.aibetguru.com/uploads/${item.code}.svg`}
            width={16}
            height={16}
            className="logo-icon"
            alt={item.name}
          />
          <p className={styles.itemName} title={item.translation}>
            {item.translation}
          </p>
        </div>
        {item.league.length > 0 && (
          <span style={iconStyle}>
            <IconArrow />
          </span>
        )}
      </div>
      <div className={styles.body} style={{ height: currentHeight + "px" }}>
        <div ref={listRef}>
          {item.league.map((lig) => (
            <League key={lig.id} item={lig} />
          ))}
        </div>
      </div>
    </div>
  );
};
