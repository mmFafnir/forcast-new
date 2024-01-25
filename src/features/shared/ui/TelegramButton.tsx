"use client";
import Button from "@/shared/UI/Button";
import styles from "../styles/telegram.module.scss";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  className?: string;
  isMob?: boolean;
}

export const TelegramButton: FC<IProps> = ({
  className = "",
  isMob = false,
}) => {
  return (
    <Button
      target="_blank"
      className={`${styles.telegram} ${className} ${isMob ? styles.mob : ""}`}
      href="https://telegram.org/me/@groupname"
    >
      <Image src={"/telegram.svg"} width={20} height={16} alt="telegram logo" />
      <span>Наш Telegram</span>
    </Button>
  );
};
