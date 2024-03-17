import React from "react";
import { IconLive } from "../icons/IconLive";
import styles from "../styles/match.module.scss";

export const Live = () => {
  return (
    <div className={`flex item-center ${styles.live}`}>
      <IconLive className={styles.iconLive} />
      <p>Live</p>
    </div>
  );
};
