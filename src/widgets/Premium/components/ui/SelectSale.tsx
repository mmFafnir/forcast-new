"use client";

import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import IconArrow from "@/shared/icons/IconArrow";
import { FC, useRef } from "react";
import styles from "../../styles/select.sale.module.scss";
const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: {
    // backgroundColor: 'red',
    transform: `scale(1, -1)`,
  },
};

export const SelectSale: FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { iconStyle, onToggle, currentHeight, onClose } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
  });

  return (
    <div className={styles.body}>
      <button onClick={onToggle}>
        <span>RUB</span>
        <span style={iconStyle}>
          <IconArrow />
        </span>
      </button>
      <div style={{ height: `${currentHeight}px` }}>
        <div>
          <button>RUB</button>
          <button>EU</button>
          <button>USD</button>
        </div>
      </div>
    </div>
  );
};
