import React, { FC } from "react";
import styles from "../styles/view.module.scss";
import { IconView } from "../icons/IconView";

interface IProps {
  className?: string;
}
export const Views: FC<IProps> = ({ className }) => {
  return (
    <div className={`${styles.body} ${className}`}>
      <IconView />
      <p>213</p>
    </div>
  );
};
