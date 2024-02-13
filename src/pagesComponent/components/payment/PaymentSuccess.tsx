import React from "react";
import styles from "./payment.module.scss";
import Button from "@/shared/UI/Button";

export const PaymentSuccess = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>
            Доступ к <span>PREMIUM</span> контенту
          </p>
        </div>
        <div className={styles.content}>
          <p className={styles.desc}>Оплата прошла успешно</p>
          <div className={styles.icon}>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
              <path
                d="M29 57.5254C44.6732 57.5254 57.3789 44.8197 57.3789 29.1465C57.3789 13.4732 44.6732 0.767578 29 0.767578C13.3268 0.767578 0.621094 13.4732 0.621094 29.1465C0.621094 44.8197 13.3268 57.5254 29 57.5254Z"
                fill="#4CAF50"
              />
              <path
                d="M43.327 16.4434L24.9482 34.8221L17.3805 27.2544L13.5967 31.0382L24.9482 42.3898L47.1108 20.2272L43.327 16.4434Z"
                fill="#345162"
              />
            </svg>
          </div>
          <p className={styles.timer}>
            Вы будете перенаправлены на сайт через 10 сек
          </p>
          <Button className={styles.btn} type="gradient" href="/">
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
};
