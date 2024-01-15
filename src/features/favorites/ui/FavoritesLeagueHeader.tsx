import React from "react";
import styles from "../styles/leagueHeader.module.scss";
import { IconFavorite } from "../icons/IconFavorite";
import Image from "next/image";
import IconPinFavorite from "../icons/IconPinFavorite";
import { PinButton } from "..";
export const FavoritesLeagueHeader = () => {
  return (
    <div className={styles.body}>
      <button className={styles.button}>
        <IconFavorite />
      </button>
      <div className={styles.league}>
        <Image
          src={"/country-icon.svg"}
          className="logo-icon"
          width={20}
          height={20}
          alt="Англия : Вторая Лига"
        />
        <span>Англия : Вторая Лига</span>
      </div>
      <PinButton />
    </div>
  );
};
