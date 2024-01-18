import React, { FC, ReactNode } from "react";
import styles from "../styles/event.module.scss";
interface IProps {
  children: ReactNode;
  best?: boolean;
}
export const Wrapper: FC<IProps> = ({ children, best = false }) => {
  return (
    <div className={`${styles.body} ${best ? styles.best : ""}`}>
      {children}
    </div>
  );
};
