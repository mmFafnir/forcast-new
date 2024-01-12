import { FC } from "react";
import styles from "./styles.module.scss";

interface IProps {
  children: number | string;
  className?: string;
}
const TotalMatches: FC<IProps> = ({ children, className = "" }) => {
  return (
    <p className={`${styles.total} ${className}`}>
      <span>{children}</span>
    </p>
  );
};

export default TotalMatches;
