"use client";
import {
  CSSProperties,
  FC,
  memo,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import Button from "@/shared/UI/Button";
import styles from "./style.module.scss";
import MyScrollbar from "../MyScrollbar";

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
  value: string | number;
  setValue: (value: TypeSelect) => void;
  styleBody?: CSSProperties;
  disabled?: boolean;
}

const Select: FC<IProps> = ({
  data,
  disabled,
  styleBody = {},
  setValue,
  value,
}) => {
  const id = useId();
  const [currentValue, setCurrentValue] = useState<TypeSelect>(
    data.find((item) => item.value == value) || data[0]
  );

  const listRef = useRef<HTMLDivElement>(null);
  const { iconStyle, onToggle, currentHeight, onClose } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
  });

  useEffect(() => {
    setCurrentValue(data.find((item) => item.value == value) || data[0]);
  }, [value]);

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

  return (
    <div
      className={`${styles.body} ${disabled ? styles.disabled : ""}`}
      id={id}
      style={styleBody}
    >
      <button
        className={styles.title}
        onClick={onToggle}
        title={currentValue.label}
      >
        <span>{currentValue.label}</span>
        <i style={iconStyle}>
          <IconArrow />
        </i>
      </button>
      <div className={styles.list} style={{ height: currentHeight + "px" }}>
        <div ref={listRef}>
          <MyScrollbar style={{ maxHeight: 300 }}>
            {data.map((item) => (
              <Button
                onClick={() => setValue(item)}
                key={item.value}
                title={item.label}
                type="text"
                active={item.value === currentValue.value}
              >
                <span>{item.label}</span>
              </Button>
            ))}
          </MyScrollbar>
        </div>
      </div>
    </div>
  );
};

export default memo(Select);
