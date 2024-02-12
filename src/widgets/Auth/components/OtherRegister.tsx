"use client";
import { FC, useEffect, useState } from "react";
import styles from "../styles/other.module.scss";
import tg from "@/shared/images/socials/tg.svg";
import apple from "@/shared/images/socials/apple.svg";
import vk from "@/shared/images/socials/vk.svg";
import y from "@/shared/images/socials/y.svg";
import mail from "@/shared/images/socials/mail.svg";
import google from "@/shared/images/socials/google.svg";
import Image from "next/image";
import { loginTelegram } from "../api/auth";
import Loader from "@/shared/UI/Loader";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { setCookie } from "nookies";
import { getUserInfo } from "..";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setUser } from "../slice/authSlice";

interface IBtn {
  name: string;
  svg: string;
  onClick: () => void;
}
const buttons: IBtn[] = [
  {
    name: "mail",
    svg: mail,
    onClick: () => {},
  },
  {
    name: "telegram",
    svg: tg,
    onClick: () => {},
  },
  {
    name: "google",
    svg: google,
    onClick: () => {},
  },
  {
    name: "apple",
    svg: apple,
    onClick: () => {},
  },
  {
    name: "vkontakte",
    svg: vk,
    onClick: () => {},
  },
  {
    name: "yahoo",
    svg: y,
    onClick: () => {},
  },
];

export const OtherRegister: FC = () => {
  const dispatch = useTypeDispatch();
  const { token } = useTypeSelector((state) => state.auth);

  const [active, setActive] = useState<string>("mail");
  const [loader, setLoader] = useState<boolean>(false);
  const onLoginTelegram = () => {
    setLoader(true);
    loginTelegram()
      .then((res) => {
        setCookie(null, "pusher_code", res.code);
        const newWindow = window.open(res.url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (!token) return;
    setCookie(null, "_token", token, {
      path: "/",
    });
    getUserInfo(token).then((res) => {
      dispatch(setUser(res));
    });
  }, [token]);

  return (
    <>
      {loader && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <div className={styles.body}>
        {buttons.map((btn) => {
          const onClick =
            btn.name === "telegram" ? onLoginTelegram : btn.onClick;
          return (
            <button
              className={`${styles.button} ${
                active === btn.name ? styles.active : ""
              }`}
              onClick={onClick}
              key={btn.name}
            >
              <Image src={btn.svg} width={26} height={23} alt={btn.name} />
            </button>
          );
        })}
      </div>
    </>
  );
};
