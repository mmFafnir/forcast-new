"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/modal.cookies.module.scss";
import Button from "@/shared/UI/Button";
import { CSSTransition } from "react-transition-group";
import { parseCookies, setCookie } from "nookies";
export const ModalAgreeCookies = () => {
  const { cookies } = parseCookies();

  const [open, setOpen] = useState(false);

  const onAgree = () => {
    setOpen(false);
    setCookie(null, "cookies", `true`, {
      maxAge: 30 * 24 * 60 * 60, // Две недели,
      path: "/",
    });
  };

  useEffect(() => {
    console.log("cookies", cookies);
    const webApp = (window as any).Telegram?.WebApp.initDataUnsafe.user;
    if (webApp) return setOpen(false);
    setOpen(cookies != "true");
  }, []);

  return (
    <CSSTransition in={open} timeout={300} classNames="opacity" unmountOnExit>
      <div className={styles.body}>
        <p>
          Этот сайт использует cookie для хранения данных. Продолжая
          использовать сайт, Вы даете согласие на работу с этими файлами
        </p>
        <Button onClick={onAgree} type="gradient">
          ПРИНЯТЬ
        </Button>
      </div>
    </CSSTransition>
  );
};
