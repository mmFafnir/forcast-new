import React, { FC } from "react";
import styles from "../styles/view.module.scss";
import { IconView } from "../icons/IconView";

interface IProps {
  className?: string;
  count: number;
}
export const Views: FC<IProps> = ({ className, count }) => {
  return (
    <div className={`${styles.body} ${className}`}>
      <p>{count}</p>
      <IconView />
    </div>
  );
};
