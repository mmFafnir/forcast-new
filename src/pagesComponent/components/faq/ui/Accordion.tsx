"use client";
import { FC, ReactNode, useRef } from "react";
import styles from "../styles.module.scss";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";

interface IProps {
  title: string;
  children: ReactNode;
}

const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: {
    // backgroundColor: 'red',
    transform: `scale(1, -1)`,
  },
};
export const Accordion: FC<IProps> = ({ title, children }) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const { iconStyle, onToggle, currentHeight } = useAccordion({
    iconStyles,
    defaultOpen: false,
    ref: listRef,
  });

  return (
    <div className={styles.acc}>
      <div className={`${styles.accHeader} acc-hover`} onClick={onToggle}>
        <h2>{title}</h2>
        <span style={iconStyle}>
          <IconArrow />
        </span>
      </div>
      <div className={styles.accBody} style={{ height: currentHeight + "px" }}>
        <div ref={listRef}>{children}</div>
      </div>
    </div>
  );
};
