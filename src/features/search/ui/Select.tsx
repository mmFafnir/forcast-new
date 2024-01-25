"use client";
import { FC, useEffect, useId, useRef, useState } from "react";
import styles from "../styles/select.module.scss";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";

type TypeSelect = {
  label: string;
  value: string | number;
};

const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: {
    // backgroundColor: 'red',
    transform: `scale(1, -1)`,
  },
};

interface IProps {
  data: TypeSelect[];
}

export const Select: FC<IProps> = ({ data }) => {
  const id = useId();

  const [currentValue, setCurrentValue] = useState<TypeSelect>(data[0]);

  const listRef = useRef<HTMLDivElement>(null);
  const { iconStyle, onToggle, currentHeight, onClose } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
  });

  useEffect(() => {
    // const onCloseEvent = (e: MouseEvent) => {
    //   const target = e.target as HTMLElement;
    //   console.log(!target.closest(`.${id}`));
    //   if (!target.closest(`.${id}`)) {
    //     onClose();
    //   }
    // };
    // document.addEventListener("click", onCloseEvent);
    // return () => document.removeEventListener("click", onCloseEvent);
  }, []);

  return (
    <div className={`${styles.body} ${id}`}>
      <button className={styles.title} onClick={onToggle}>
        <span>{currentValue.label}</span>
        <i style={iconStyle}>
          <IconArrow />
        </i>
      </button>
      <div className={styles.list} style={{ height: currentHeight + "px" }}>
        <div ref={listRef}>
          {data.map((item) => (
            <button
              onClick={() => setCurrentValue(item)}
              key={item.value}
              title={item.label}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
