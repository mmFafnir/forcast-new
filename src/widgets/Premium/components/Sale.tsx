import { FC } from "react";
import styles from "../styles/sale.module.scss";
import { Range } from "./ui/Range";

interface IProps {
  day: number;
  setDay: (day: number) => void;
}
export const Sale: FC<IProps> = ({ day, setDay }) => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <p>{day} дней</p>
        <p>70.59 руб. / день</p>
      </div>
      <div className={styles.content}>
        <Range setDay={setDay} />
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
