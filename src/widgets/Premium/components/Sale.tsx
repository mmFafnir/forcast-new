import { FC } from "react";
import styles from "../styles/sale.module.scss";
import { Range } from "./ui/Range";

export const Sale: FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <p>30 дней</p>
        <p>70.59 руб. / день</p>
      </div>
      <div className={styles.content}>
        <Range />
      </div>
      <div className={styles.footer}>
        <p className={styles.discount}>
          Сэкономлено:
          <span style={{ color: "#84EB88" }}> 571 руб</span>
        </p>
        <p className={styles.sum}>2399 руб.</p>
      </div>
    </div>
  );
};
