"use client";
import Button from "@/shared/UI/Button";
import styles from "../styles/telegram.module.scss";
import Image from "next/image";
import { FC } from "react";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IProps {
  className?: string;
  isMob?: boolean;
}

export const TelegramButton: FC<IProps> = ({
  className = "",
  isMob = false,
}) => {
  const { webApp } = useTypeSelector((state) => state.auth);

  const onClick = () =>
    (window.location.href = "tg://resolve?domain=aibetguru_ru_bot");

  if (webApp) return <></>;
  return (
    <>
      <Button
        className={`${styles.telegram} ${className} ${isMob ? styles.mob : ""}`}
        onClick={onClick}
      >
        <Image
          src={"/telegram.svg"}
          width={20}
          height={16}
          alt="telegram logo"
        />
        <span>Наш Telegram</span>
      </Button>
    </>
  );
};
