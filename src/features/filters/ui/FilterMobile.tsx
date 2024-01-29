"use client";
import { FC, useEffect, useRef } from "react";
import styles from "../styles/filterMobile.module.scss";
import Button from "@/shared/UI/Button";
import { filters } from "../consts/filtes";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { TypeTimeStatus } from "..";
import { setTimeStatus } from "../slice/filterSlice";

const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: {
    transform: `scale(1, -1)`,
  },
};

export const FilterMobile: FC = () => {
  const { timeStatus } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const listRef = useRef<HTMLDivElement | null>(null);
  const { iconStyle, onToggle, onClose, currentHeight, isOpen } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
  });

  const onChangeValue = (value: TypeTimeStatus) =>
    dispatch(setTimeStatus(value));

  useEffect(() => {
    const onCloseOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(`.${styles.body}`)) return;
      onClose();
    };

    document.addEventListener("click", onCloseOutside);
    return () => document.removeEventListener("click", onCloseOutside);
  }, []);

  return (
    <div className={styles.body}>
      <Button className={styles.title} onClick={onToggle}>
        <span>
          {filters.find((item) => item.value === timeStatus)?.label || "Все"}
        </span>
        <span style={iconStyle}>
          <IconArrow />
        </span>
      </Button>
      <div className={styles.list} style={{ height: currentHeight + "px" }}>
        <div ref={listRef}>
          {filters.map((item) => (
            <Button
              active={item.value === timeStatus}
              key={item.value}
              onClick={() => onChangeValue(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
