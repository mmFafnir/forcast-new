import { FC } from "react";
import styles from "../styles/found.module.scss";

export const Found: FC = () => {
  return (
    <div className={styles.body}>
      <p>Всего: 2</p>
      <p>Страны: 2</p>
      <p>Лиги: 2</p>
      <p>Матчи: 16</p>
      <p>Завершенные</p>
    </div>
  );
};
