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
      <p className={styles.title}>{title}</p>
      <div
        className={styles.bar}
        style={{
          flex: `0 1 ${(available / total ? available / total : 0) * 100}%`,
          background: ` linear-gradient(270deg, ${color} 0%, rgba(101, 104, 118, 0.00) 100%)`,
        }}
      >
        <p>{Math.floor((available / total ? available / total : 0) * 100)}%</p>
      </div>
      <p className={styles.total}>
        {available} / {total}
      </p>
    </div>
  );
};
