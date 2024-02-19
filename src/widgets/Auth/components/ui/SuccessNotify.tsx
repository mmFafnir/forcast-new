"use client";
import React, { useEffect } from "react";
import styles from "../../styles/ui/success.module.scss";
import Button from "@/shared/UI/Button";
export const SuccessNotify = () => {
  useEffect(() => {}, []);

  return (
    <div className={styles.body}>
      <p className={styles.title}> Вы успешно авторизованы</p>
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
        <path
          d="M28.9219 57.3516C44.5951 57.3516 57.3008 44.6459 57.3008 28.9727C57.3008 13.2994 44.5951 0.59375 28.9219 0.59375C13.2486 0.59375 0.542969 13.2994 0.542969 28.9727C0.542969 44.6459 13.2486 57.3516 28.9219 57.3516Z"
          fill="#4CAF50"
        />
        <path
          d="M43.2488 16.2695L24.8701 34.6483L17.3024 27.0805L13.5186 30.8644L24.8701 42.216L47.0327 20.0534L43.2488 16.2695Z"
          fill="#345162"
        />
      </svg>
      <p className={styles.timer}>
        Вы будете перенаправлены на сайт через 10 сек
      </p>
      <Button className={styles.btn} href="/" type="gradient">
        На главную
      </Button>
    </div>
  );
};
