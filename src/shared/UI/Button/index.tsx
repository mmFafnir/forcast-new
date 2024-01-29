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
  title?: string;
  loading?: boolean;
  iconButton?: boolean;
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
        <div className={styles.loading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
          >
            <path
              d="M20.2442 20.6195C20.852 21.2272 20.8572 22.2217 20.1778 22.7481C18.351 24.1635 16.154 25.0439 13.8335 25.2724C10.9942 25.5521 8.14578 24.8386 5.77358 23.2535C3.40138 21.6685 1.65216 19.3099 0.823971 16.5797C-0.00421789 13.8496 0.139865 10.9167 1.23167 8.28083C2.32348 5.64498 4.29545 3.46924 6.81159 2.12433C9.32774 0.779428 12.2324 0.348567 15.0306 0.905165C17.8288 1.46176 20.3474 2.97138 22.1574 5.1768C23.6366 6.97925 24.5676 9.15531 24.8585 11.4478C24.9667 12.3005 24.2598 13 23.4003 13C22.5408 13 21.8574 12.2984 21.713 11.4511C21.4453 9.88046 20.7733 8.39664 19.7514 7.15135C18.3982 5.50258 16.5153 4.37398 14.4233 3.95787C12.3314 3.54176 10.1599 3.86387 8.27882 4.86932C6.39775 5.87478 4.92349 7.50137 4.10726 9.47194C3.29102 11.4425 3.1833 13.6351 3.80246 15.6762C4.42161 17.7173 5.72933 19.4806 7.5028 20.6655C9.27627 21.8505 11.4057 22.3839 13.5284 22.1749C15.1316 22.017 16.656 21.4429 17.9559 20.5216C18.6571 20.0246 19.6365 20.0117 20.2442 20.6195Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default Button;
