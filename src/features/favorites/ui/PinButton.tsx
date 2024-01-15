"use client";
import { FC, useState } from "react";
import IconPinFavorite from "../icons/IconPinFavorite";
import styles from "../styles/pin.module.scss";

interface IProps {
  active?: boolean;
}

export const PinButton: FC<IProps> = ({ active = false }) => {
  const [isPin, setIsPin] = useState<boolean>(active);
  const onTogglePin = () => setIsPin((prev) => !prev);
  return (
    <button
      className={`${styles.button} ${isPin ? styles.active : ""}`}
      onClick={onTogglePin}
    >
      <IconPinFavorite />
    </button>
  );
};
