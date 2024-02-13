import React from "react";
import styles from "./payment.module.scss";
import Button from "@/shared/UI/Button";

export const PaymentInvalid = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>
            Доступ к <span>PREMIUM</span> контенту
          </p>
        </div>
        <div className={styles.content}>
          <p className={styles.desc}>Оплата не прошла</p>
          <div className={styles.icon}>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
              <path
                d="M29 57.3516C44.6732 57.3516 57.3789 44.6459 57.3789 28.9727C57.3789 13.2994 44.6732 0.59375 29 0.59375C13.3268 0.59375 0.621094 13.2994 0.621094 28.9727C0.621094 44.6459 13.3268 57.3516 29 57.3516Z"
                fill="#E87E7E"
              />
              <path
                d="M23.4269 16.3398L28.4665 24.8572H28.6618L33.7258 16.3398H39.6928L32.0663 28.8352L39.8636 41.3305H33.7868L28.6618 32.801H28.4665L23.3415 41.3305H17.2891L25.1108 28.8352L17.4355 16.3398H23.4269Z"
                fill="#344E5F"
              />
            </svg>
          </div>
          <Button className={styles.btn} type="gradient" href="/">
            Вернуться к оплате
          </Button>
        </div>
      </div>
    </div>
  );
};
