import React from "react";
import styles from "../styles/league.module.scss";
import { PinButton } from "@/features/favorites";

export const League = () => {
  return (
    <div className={styles.item}>
      <p className={styles.name}>Название лиги</p>
      <PinButton />
    </div>
  );
};
