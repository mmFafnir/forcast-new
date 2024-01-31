"use client";
import { FC, useState } from "react";
import styles from "../styles/other.module.scss";
import tg from "../images/tg.svg";
import apple from "../images/apple.svg";
import vk from "../images/vk.svg";
import y from "../images/y.svg";
import mail from "../images/mail.svg";
import google from "../images/google.svg";
import Image from "next/image";

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
  const [active, setActive] = useState<string>("mail");
  return (
    <div className={styles.body}>
      {buttons.map((btn) => (
        <button
          className={`${styles.button} ${
            active === btn.name ? styles.active : ""
          }`}
          onClick={btn.onClick}
          key={btn.name}
        >
          <Image src={btn.svg} width={26} height={23} alt={btn.name} />
        </button>
      ))}
    </div>
  );
};
