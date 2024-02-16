"use client";
import { FC, use, useEffect, useMemo } from "react";
import styles from "../styles/other.module.scss";
import tg from "@/shared/images/socials/tg.svg";
import apple from "@/shared/images/socials/apple.svg";
import vk from "@/shared/images/socials/vk.svg";
import y from "@/shared/images/socials/y.svg";
import mail from "@/shared/images/socials/mail.svg";
import google from "@/shared/images/socials/google.svg";
import Image from "next/image";
import { IconCheck } from "../icons/IconCheck";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IBtn {
  name: string;
  svg: string;
  onClick: () => void;
}
interface IProps {
  setComponent: (value: string) => void;
  component: string;
}
export const OtherSnap: FC<IProps> = ({ component, setComponent }) => {
  const { user } = useTypeSelector((state) => state.auth);

  const buttons = useMemo(
    () => [
      {
        name: "mail",
        svg: mail,
        checked: user?.email ? true : false,
      },
      {
        name: "telegram",
        svg: tg,
        checked: user?.telegram_id ? true : false,
      },
      {
        name: "google",
        svg: google,
      },
      {
        name: "apple",
        svg: apple,
      },
      {
        name: "vkontakte",
        svg: vk,
      },
      {
        name: "yahoo",
        svg: y,
      },
    ],
    [user]
  );

  useEffect(() => {
    setComponent(buttons.find((btn) => !btn.checked)?.name || "mail");
  }, [buttons]);

  console.log(user);
  return (
    <>
      <div className={styles.body}>
        {buttons.map((btn) => {
          return (
            <button
              disabled={btn.checked}
              className={`${styles.button} ${
                component === btn.name || btn.checked ? styles.active : ""
              }`}
              onClick={() => setComponent(btn.name)}
              key={btn.name}
            >
              {btn.checked ? <IconCheck /> : <></>}
              <Image src={btn.svg} width={26} height={23} alt={btn.name} />
            </button>
          );
        })}
      </div>
    </>
  );
};