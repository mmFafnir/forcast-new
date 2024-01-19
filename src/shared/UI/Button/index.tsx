"use client";
import React, { CSSProperties, FC, MouseEvent, ReactNode } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

type Type = "gradient" | "default" | "gray" | "text";

interface IProps {
  children: ReactNode | string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  width?: string;
  height?: string;
  type?: Type;
  style?: CSSProperties;
  href?: string;
  target?: "_blank";
  active?: boolean;
  htmlType?: "button" | "submit";
}
const Button: FC<IProps> = ({
  className = "",
  children,
  onClick,
  width,
  height,
  type = "default",
  style = {},
  href,
  target,
  active = false,
  htmlType = "button",
}) => {
  const newStyles = { width, height, ...style };

  const handlerClick = (e: MouseEvent<HTMLElement>) => onClick && onClick(e);

  if (href)
    return (
      <Link
        style={newStyles}
        href={href}
        className={`${styles.button} ${
          active ? styles.active : ""
        } ${className} ${styles[type]}`}
        target={target}
      >
        {children}
      </Link>
    );
  return (
    <button
      type={htmlType}
      style={newStyles}
      onClick={handlerClick}
      className={`${styles.button} ${
        active ? styles.active : ""
      } ${className} ${styles[type]}`}
    >
      {children}
    </button>
  );
};

export default Button;
