"use client";

import { FC, useEffect, useState } from "react";
import styles from "../../styles/snaps/telegram.module.scss";
import Image from "next/image";
import Button from "@/shared/UI/Button";
import axios from "@/shared/core/axios";
import { setCookie } from "nookies";
import { loginTelegram } from "../../api/auth";
import { QRCodeSVG } from "qrcode.react";
import Loader from "@/shared/UI/Loader";
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
  const [url, setUrl] = useState<string | null>(null);

  const openTelegram = () => {
    if (!url) return;
    let a = document.createElement("a") as HTMLAnchorElement;
    document.body.appendChild(a);
    a.style.display = "none";
    a.target = "_blank";
    a.href = url;

    setTimeout(() => {
      a.click();
      document.body.removeChild(a);
      return;
    }, 100);
  };

  const onSpanTelegram = () => {
    setLoading(true);
    const asyncAction = mode == "bind" ? postBindingTelegram : loginTelegram;
    asyncAction()
      .then((res) => {
        setUrl(res.url);
        setCookie(null, "pusher_code", `${res.code}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    onSpanTelegram();
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.flex}>
        <div className={styles.qr}>
          {url ? <QRCodeSVG value={url} /> : <Loader />}
          {/* <Image
            src={"/telegramQR.png"}
            width={500}
            height={500}
            alt="telegram QR code"
          /> */}
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
        onClick={openTelegram}
      >
        Перейти
      </Button>
    </div>
  );
};
