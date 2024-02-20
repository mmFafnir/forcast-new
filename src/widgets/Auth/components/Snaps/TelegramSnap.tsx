"use client";

import { FC, useState } from "react";
import styles from "../../styles/snaps/telegram.module.scss";
import Image from "next/image";
import Button from "@/shared/UI/Button";
import axios from "@/shared/core/axios";
import { setCookie } from "nookies";
import { loginTelegram } from "../../api/auth";

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
        setCookie(null, "pusher_code", `${res.code}`);
        setTimeout(() => {
          const newWindow = window.open(
            res.url,
            "_blank",
            "noopener,noreferrer"
          );
          if (newWindow) newWindow.opener = null;
          console.log(res);
        });
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
      <div className={styles.link}>
        <svg width="17" height="21" viewBox="0 0 17 21" fill="none">
          <path
            d="M14.2061 12.3114C14.4987 12.3114 14.7884 12.3691 15.0588 12.481C15.3291 12.593 15.5747 12.7571 15.7816 12.9641C15.9886 13.171 16.1527 13.4166 16.2647 13.6869C16.3766 13.9573 16.4343 14.247 16.4343 14.5396V15.4349C16.4344 15.9702 16.3188 16.4992 16.0954 16.9857C15.872 17.4721 15.5461 17.9045 15.1399 18.2533C13.5901 19.5842 11.3708 20.2339 8.50883 20.2339C5.64684 20.2339 3.43053 19.5842 1.88367 18.2533C1.47811 17.9048 1.15258 17.4728 0.929365 16.9869C0.706147 16.501 0.5905 15.9726 0.590332 15.4378V14.5386C0.590595 13.9478 0.825465 13.3814 1.2433 12.9637C1.66114 12.546 2.22774 12.3114 2.81852 12.3114H14.2061ZM8.50883 0.427734C8.68831 0.427742 8.86172 0.492741 8.99699 0.610711C9.13225 0.72868 9.22022 0.89164 9.24463 1.06945L9.25156 1.17047L9.25057 1.91221H12.7167C13.3076 1.91221 13.8744 2.14696 14.2922 2.56483C14.7101 2.9827 14.9448 3.54944 14.9448 4.1404V8.60174C14.9448 9.19269 14.7101 9.75944 14.2922 10.1773C13.8744 10.5952 13.3076 10.8299 12.7167 10.8299H4.29903C3.70808 10.8299 3.14133 10.5952 2.72346 10.1773C2.3056 9.75944 2.07084 9.19269 2.07084 8.60174V4.14139C2.07084 3.84869 2.12851 3.55887 2.24055 3.28847C2.35259 3.01807 2.5168 2.77239 2.72381 2.56547C2.93083 2.35855 3.17658 2.19444 3.44703 2.08252C3.71748 1.9706 4.00733 1.91307 4.30003 1.9132L7.7661 1.91221V1.17047C7.76614 0.990835 7.83128 0.817307 7.94945 0.68202C8.06762 0.546733 8.23082 0.458857 8.40881 0.434666L8.50883 0.427734ZM6.27965 4.88412C6.11305 4.87745 5.94683 4.90451 5.79095 4.96366C5.63506 5.02282 5.49274 5.11285 5.37251 5.22837C5.25228 5.34388 5.15662 5.48249 5.09128 5.63588C5.02594 5.78927 4.99226 5.95429 4.99226 6.12101C4.99226 6.28774 5.02594 6.45275 5.09128 6.60615C5.15662 6.75954 5.25228 6.89815 5.37251 7.01366C5.49274 7.12918 5.63506 7.21921 5.79095 7.27837C5.94683 7.33752 6.11305 7.36458 6.27965 7.35791C6.59913 7.34512 6.90127 7.20921 7.12279 6.97865C7.34431 6.74809 7.46803 6.44075 7.46803 6.12101C7.46803 5.80128 7.34431 5.49394 7.12279 5.26338C6.90127 5.03281 6.59913 4.89691 6.27965 4.88412ZM10.7291 4.88412C10.5625 4.87745 10.3963 4.90451 10.2404 4.96366C10.0845 5.02282 9.94219 5.11285 9.82196 5.22837C9.70173 5.34388 9.60608 5.48249 9.54074 5.63588C9.4754 5.78927 9.44171 5.95429 9.44171 6.12101C9.44171 6.28774 9.4754 6.45275 9.54074 6.60615C9.60608 6.75954 9.70173 6.89815 9.82196 7.01366C9.94219 7.12918 10.0845 7.21921 10.2404 7.27837C10.3963 7.33752 10.5625 7.36458 10.7291 7.35791C11.0486 7.34512 11.3507 7.20921 11.5722 6.97865C11.7938 6.74809 11.9175 6.44075 11.9175 6.12101C11.9175 5.80128 11.7938 5.49394 11.5722 5.26338C11.3507 5.03281 11.0486 4.89691 10.7291 4.88412Z"
            fill="white"
          />
        </svg>
        <button disabled={loading} onClick={onSpanTelegram}>
          https//telegram.me
        </button>
      </div>
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
