"use client";
import React, { FC, ReactNode, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import useAccordion from "@/shared/hooks/useAccardion";
import IconArrow from "@/shared/icons/IconArrow";

interface IProps {
  title: string | ReactNode;
  text: string | ReactNode;
}
const TextMore: FC<IProps> = ({ text, title }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { isOpen, onToggle, currentHeight, iconStyle } = useAccordion({
    iconStyles: {
      open: {},
      close: {
        transform: `scale(1, -1)`,
      },
    },
    ref: listRef,
    defaultHeight: 126,
    defaultOpen: false,
  });

  useEffect(() => {}, []);

  return (
    <div className={styles.body}>
      {title && <p className={styles.title}>{title}</p>}

      <div
        className={`${styles.content} ${isOpen ? styles.show : ""}`}
        style={{ height: currentHeight + "px" }}
      >
        <div className={styles.text} ref={listRef}>
          {text}
        </div>
      </div>
      {listRef.current && listRef.current.clientHeight > 128 && (
        <button onClick={onToggle} className={styles.more}>
          <span>{!isOpen ? "Читать полностью" : "Закрыть"}</span>
          <span style={iconStyle}>
            <IconArrow />
          </span>
        </button>
      )}
    </div>
  );
};

export default TextMore;
