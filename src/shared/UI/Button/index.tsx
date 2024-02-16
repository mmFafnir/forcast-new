"use client";
import React, { CSSProperties, FC, MouseEvent, ReactNode } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import IconLoader from "@/shared/icons/IconLoader";

export type TypeButton = "gradient" | "default" | "gray" | "text" | "none";

interface IProps {
  children: ReactNode | string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  width?: string;
  height?: string;
  type?: TypeButton;
  style?: CSSProperties;
  href?: string;
  target?: "_blank";
  active?: boolean;
  htmlType?: "button" | "submit";
  title?: string;
  loading?: boolean;
  iconButton?: boolean;
  onBlur?: () => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
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
  title,
  loading = false,
  iconButton = false,
  onBlur = () => {},
  onMouseEnter,
  onMouseLeave,
}) => {
  const newStyles = { width, height, ...style };

  const handlerClick = (e: MouseEvent<HTMLElement>) => onClick && onClick(e);

  if (href)
    return (
      <Link
        style={newStyles}
        href={href}
        title={title}
        className={`
          ${styles.button} 
          ${active ? styles.active : ""} 
          ${className} 
          ${iconButton ? styles.iconBtn : ""} 
          ${styles[type]}`}
        target={target}
      >
        {children}
      </Link>
    );
  return (
    <button
      type={htmlType}
      title={title}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={newStyles}
      onClick={handlerClick}
      className={`
        ${styles.button} 
        ${active ? styles.active : ""} 
        ${className} 
        ${styles[type]} 
        ${iconButton ? styles.iconBtn : ""} 
        ${loading ? styles.disable : ""}`}
    >
      {!loading && children}
      {loading && (
        <div className={`${styles.loading} loader-btn`}>
          <IconLoader />
        </div>
      )}
    </button>
  );
};

export default Button;
