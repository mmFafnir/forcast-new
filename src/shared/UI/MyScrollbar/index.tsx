"use client";
import React, { CSSProperties, FC, ReactNode } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import styles from "./styles.module.scss";

interface IProps {
  children: ReactNode;
  className?: string;
  scrollSize?: "big" | "small";
  style?: CSSProperties;
  autoHide?: boolean;
}

const MyScrollbar: FC<IProps> = ({
  children,
  className = "",
  scrollSize = "small",
  autoHide = true,
  style = {},
}) => {
  return (
    <SimpleBar
      style={style}
      autoHide={false}
      onScroll={(e) => console.log(e)}
      className={`${styles.body} ${autoHide ? "scroll-hide" : ""} ${className}`}
    >
      {children}
    </SimpleBar>
  );
};

export default MyScrollbar;
