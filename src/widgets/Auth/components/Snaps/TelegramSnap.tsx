"use client";

import { FC, useState } from "react";
import styles from "../../styles/snaps/telegram.module.scss";
import Image from "next/image";
import Button from "@/shared/UI/Button";
import axios from "@/shared/core/axios";
import { setCookie } from "nookies";
import { loginTelegram } from "../../api/auth";
import { isMobile } from "@/features/shared/scripts/isMobile";

interface IFetchData {
  status: boolean;
  message: string;
  code: number;
  url: string;
}

const postBindingTelegram = async (): Promise<IFetchData> => {
  const { data } = await axios.post("/binding_telegram");
  return data;
};

interface IProps {
  mode?: "bind" | "login";
}

export const TelegramSnap: FC<IProps> = ({ mode = "bind" }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSpanTelegram = () => {
    setLoading(true);
    const asyncAction = mode == "bind" ? postBindingTelegram : loginTelegram;
    asyncAction()
      .then((res) => {
        let a = document.createElement("a") as HTMLAnchorElement;
        document.body.appendChild(a);
        a.style.display = "none";
        a.target = "_blank";
        a.href = res.url;
        setCookie(null, "pusher_code", `${res.code}`);
        setTimeout(() => {
          // if (isMobile.iOS()) {
          a.click();
          document.body.removeChild(a);
          return;
          // }
          // const newWindow = window.open(
          //   res.url,
          //   "_blank",
          //   "noopener,noreferrer"
          // );
          // if (newWindow) newWindow.opener = null;
          // console.log(res);
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.body}>
      <div className={styles.flex}>
        <div className={styles.qr}>
          <Image
            src={"/telegramQR.png"}
            width={500}
            height={500}
            alt="telegram QR code"
          />
        </div>
        <div className={styles.text}>
          <p>Инструкция:</p>
          <p>
            Запустите бота перейдя по ссылке или отскаанировав QR-код, введите
            код из бота
          </p>
          <p>
            Если у вас уже есть бот, нажмите на кнопку “Авторизация на сайте”
          </p>
        </div>
      </div>
      <Button
        loading={loading}
        className={styles.btn}
        type="gradient"
        onClick={onSpanTelegram}
      >
        Перейти
      </Button>
    </div>
  );
};
