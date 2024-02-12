"use client";
import { FC, useEffect, useId, useRef, useState } from "react";
import styles from "../styles/select.module.scss";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import Button from "@/shared/UI/Button";

type TypeSelect = {
  label: string;
  value: string | number;
};

const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: {
    transform: `scale(1, -1)`,
  },
};

interface IProps {
  data: TypeSelect[];
  setValue: (value: string | number) => void;
}

export const Select: FC<IProps> = ({ data, setValue }) => {
  const id = useId();
  const [currentValue, setCurrentValue] = useState<TypeSelect>(data[0]);
  const listRef = useRef<HTMLDivElement>(null);
  const { iconStyle, onToggle, currentHeight, onClose } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
  });

  useEffect(() => {
    const onCloseEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest(`.${styles.body}`);
      if (closest && closest.id === id) return;
      onClose();
    };
    document.addEventListener("click", onCloseEvent);
    return () => document.removeEventListener("click", onCloseEvent);
  }, []);

  useEffect(() => {
    setValue(currentValue.value);
  }, [currentValue]);

  return (
    <div className={`${styles.body}`} id={id}>
      <button className={styles.title} onClick={onToggle}>
        <span>{currentValue.label}</span>
        <i style={iconStyle}>
          <IconArrow />
        </i>
      </button>
      <div className={styles.list} style={{ height: currentHeight + "px" }}>
        <div ref={listRef}>
          {data.map((item) => (
            <Button
              onClick={() => setCurrentValue(item)}
              key={item.value}
              title={item.label}
              type="text"
              active={item.value === currentValue.value}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
