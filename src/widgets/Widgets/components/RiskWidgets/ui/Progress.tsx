import { FC } from "react";
import styles from "../styles/progress.module.scss";

interface IProps {
  title: string;
  color: string;
  total: number;
  available: number;
}

export const Progress: FC<IProps> = ({ color, title, available, total }) => {
  return (
    <div className={styles.body}>
      <p>{title}</p>
      <div
        className={styles.bar}
        style={{
          flex: `0 0 calc(${(available / total) * 100}% + 53px)`,
          background: ` linear-gradient(270deg, ${color} 0%, rgba(101, 104, 118, 0.00) 100%)`,
        }}
      >
        <p>{Math.floor((available / total) * 100)}%</p>
      </div>
      <p>
        {available} / {total}
      </p>
    </div>
  );
};
