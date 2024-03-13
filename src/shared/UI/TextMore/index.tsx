"use client";
import React, { CSSProperties, FC, ReactNode, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import useAccordion from "@/shared/hooks/useAccardion";
import IconArrow from "@/shared/icons/IconArrow";

interface IProps {
  title: string | ReactNode;
  text?: string | ReactNode;
  children?: ReactNode;
  defaultHeight?: number;
  stylesBody?: CSSProperties;
  stylesClose?: CSSProperties;
}
const TextMore: FC<IProps> = ({
  text,
  title,
  children,
  stylesBody = {},
  defaultHeight = 126,
  stylesClose = {},
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { isOpen, onToggle, currentHeight, iconStyle } = useAccordion({
    iconStyles: {
      open: {},
      close: {
        transform: `scale(1, -1)`,
      },
    },
    ref: listRef,
    defaultHeight: defaultHeight,
    defaultOpen: false,
  });

  useEffect(() => {}, []);

  return (
    <div className={styles.body} style={stylesBody}>
      {title && <p className={styles.title}>{title}</p>}

      <div
        className={`${styles.content} ${isOpen ? styles.show : styles.hide}`}
        style={{ height: currentHeight + "px" }}
      >
        <div className={styles.text} ref={listRef}>
          {text && text}
          {children && children}
        </div>
      </div>
      {listRef.current && listRef.current.clientHeight > 128 && (
        <button onClick={onToggle} className={styles.more} style={stylesClose}>
          <span>{!isOpen ? "Читать полностью" : "Скрыть"}</span>
          <span style={iconStyle}>
            <IconArrow />
          </span>
        </button>
      )}
    </div>
  );
};

export default TextMore;
