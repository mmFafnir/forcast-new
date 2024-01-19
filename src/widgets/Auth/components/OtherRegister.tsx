import { FC } from "react";
import styles from "../styles/other.module.scss";
import tg from "../images/tg.svg";
import apple from "../images/apple.svg";
import vk from "../images/vk.svg";
import y from "../images/y.svg";
import google from "../images/google.svg";
import Image from "next/image";

interface IBtn {
  name: string;
  svg: string;
  onClick: () => void;
}
const buttons: IBtn[] = [
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
  return (
    <div className={styles.body}>
      {buttons.map((btn) => (
        <button className={styles.button} onClick={btn.onClick} key={btn.name}>
          <Image src={btn.svg} width={19} height={19} alt={btn.name} />
        </button>
      ))}
    </div>
  );
};
