"use client";
import React, { FC, ReactNode, useRef } from "react";
import styles from "./styles.module.scss";
import useAccordion from "@/shared/hooks/useAccardion";

interface IProps {
  title: string | ReactNode;
  text: string | ReactNode;
}
const TextMore: FC<IProps> = ({ text, title }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { isOpen, onToggle, currentHeight } = useAccordion({
    iconStyles: { open: {}, close: {} },
    ref: listRef,
    defaultHeight: 126,
    defaultOpen: false,
  });

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
      <button onClick={onToggle} className={styles.more}>
        {!isOpen ? "Читать полностью" : "Закрыть"}
      </button>
    </div>
  );
};

export default TextMore;
