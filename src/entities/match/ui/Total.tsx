import React, { FC } from "react";
import styles from "../styles/total.module.scss";
import { IconCup } from "../icons/IconCup";

interface IProps {
  color?: string;
}
export const Total: FC<IProps> = ({ color }) => {
  return (
    <div className={styles.body}>
      <IconCup />
      <p className={styles.name}>Тотал больше</p>
      <p style={{ color }}>1.65</p>
    </div>
  );
};
