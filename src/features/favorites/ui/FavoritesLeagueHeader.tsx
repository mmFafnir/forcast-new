"use client";
import React, { FC } from "react";
import styles from "../styles/leagueHeader.module.scss";
import { IconFavorite } from "../icons/IconFavorite";
import Image from "next/image";
import { PinButton } from "..";
import { ILeagues } from "@/pagesComponent/types/TypeSportGroup";

interface IProps {
  league: ILeagues;
}
export const FavoritesLeagueHeader: FC<IProps> = ({ league }) => {
  return (
    <div className={styles.body}>
      <button className={styles.button}>
        <IconFavorite />
      </button>
      <div className={styles.league}>
        <Image
          src={`https://admin.aibetguru.com/uploads/${league.league_cc}.svg`}
          className="logo-icon"
          width={400}
          height={400}
          alt={league.league_name}
        />
        <span>{league.league_name}</span>
      </div>
      <PinButton />
    </div>
  );
};
