import { FC } from "react";
import styles from "../styles/icons.module.scss";

interface IProps {
  className?: string;
}

export const IconLive: FC<IProps> = ({ className = "" }) => {
  return (
    <span className={`${styles.live} ${className}`}>
      <span></span>
    </span>
  );
};
