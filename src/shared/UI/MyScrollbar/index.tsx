"use client";

import React, { CSSProperties, FC, ReactNode, useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import styles from "./styles.module.scss";

interface IProps {
  children: ReactNode;
  className?: string;
  scrollSize?: "big" | "small";
  style?: CSSProperties;
  autoHide?: boolean;
  bottomTrigger?: number;
  onBottomScroll?: (value: boolean) => void;
}

const MyScrollbar: FC<IProps> = ({
  children,
  className = "",
  scrollSize = "small",
  autoHide = true,
  style = {},
  onBottomScroll,
  bottomTrigger = 0,
}) => {
  const scrollableNodeRef = React.createRef<HTMLElement>();

  const onScroll = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    if (!onBottomScroll) return;
    if (target) {
      const { scrollTop, scrollHeight, clientHeight } = target;

      const isNearBottom =
        Math.ceil(scrollTop + clientHeight + 1 + bottomTrigger) >= scrollHeight;

      if (isNearBottom) return onBottomScroll(true);
      onBottomScroll(false);
    }
  };

  useEffect(() => {
    if (!onBottomScroll) return;
    const listInnerElement = scrollableNodeRef.current;
    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  return (
    <SimpleBar
      style={style}
      autoHide={false}
      scrollableNodeProps={{ ref: scrollableNodeRef }}
      className={`${styles.body} ${autoHide ? "scroll-hide" : ""} ${className}`}
    >
      {children}
    </SimpleBar>
  );
};

export default MyScrollbar;
