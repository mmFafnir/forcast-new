import React, { FC } from "react";
import styles from "../styles/total.module.scss";
import IconCup from "../../../shared/icons/IconCup";
import { ToolkitSpan } from "@/features/Toolkit";

interface IProps {
  color?: string;
}
export const Total: FC<IProps> = ({ color }) => {
  return (
    <div className={styles.body}>
      <ToolkitSpan className={styles.cup} title="Лучшая ставка">
        <IconCup />
      </ToolkitSpan>
      <p className={styles.name}>Тотал больше</p>
      <p style={{ color }}>1.65</p>
    </div>
  );
};
