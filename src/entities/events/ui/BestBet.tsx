import { FC } from "react";
import IconCup from "@/shared/icons/IconCup";
import styles from "../styles/bestbet.module.scss";

const BestBet: FC = () => {
  return (
    <p className={styles.body}>
      <IconCup />
      <span>Лучшая ставка</span>
    </p>
  );
};

export default BestBet;
