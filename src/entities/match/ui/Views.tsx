import React, { FC } from "react";
import styles from "../styles/view.module.scss";
import { IconView } from "../icons/IconView";

interface IProps {
  className?: string;
  count: number;
}
export const Views: FC<IProps> = ({ className, count }) => {
  if (count === 0) return;
  return (
    <div className={`${styles.body} ${className}`}>
      <IconView />
      <p>{count}</p>
    </div>
  );
};
