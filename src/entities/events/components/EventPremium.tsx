import React from "react";
import styles from "../styles/premium.module.scss";
import BestBet from "../ui/BestBet";
import Link from "next/link";

const EventPremium = () => {
  return (
    <div className={styles.premium}>
      <div className={styles.header}>
        <h3>Индивидуальный тотал голов</h3>
        <BestBet />
      </div>
      <button>
        <span>
          ПОЛУЧИТЬ <i>PREMIUM</i> БЕСПЛАТНО НА 7 ДНЕЙ
        </span>
      </button>
      <Link href={"/"}>Что такое Premium?</Link>
    </div>
  );
};

export default EventPremium;
