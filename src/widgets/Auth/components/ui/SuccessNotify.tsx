"use client";
import React, { useEffect } from "react";
import styles from "../../styles/ui/success.module.scss";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeAllModal } from "@/shared/UI/Modal/modalSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTimer } from "react-timer-hook";

let timerId: NodeJS.Timeout | null = null;

export const SuccessNotify = () => {
  const dispatch = useTypeDispatch();
  const { modal } = useTypeSelector((state) => state.modal);

  const { seconds, restart, isRunning, pause } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => dispatch(closeAllModal()),
    autoStart: true,
  });

  const onCloseModal = () => {
    dispatch(closeAllModal());
    pause();
  };

  useEffect(() => {
    if (modal === null && isRunning) {
      pause();
    }
  }, [modal]);

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10);
    restart(time);
  }, []);

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
        Вы будете перенаправлены на сайт через {seconds} сек
      </p>
      <Button className={styles.btn} type="gradient" onClick={onCloseModal}>
        Закрыть
      </Button>
    </div>
  );
};
