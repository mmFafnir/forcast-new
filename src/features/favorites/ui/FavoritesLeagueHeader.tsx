"use client";
import React, { FC } from "react";
import styles from "../styles/leagueHeader.module.scss";
import { IconFavorite } from "../icons/IconFavorite";
import Image from "next/image";
import { FavoriteAdd, PinButton } from "..";
import { ILeagues } from "@/pagesComponent/types/TypeSportGroup";

interface IProps {
  league: ILeagues;
}
export const FavoritesLeagueHeader: FC<IProps> = ({ league }) => {
  return (
    <div className={styles.body}>
      <FavoriteAdd
        active={
          !league.games.find((game) => game.favorite_auth_user_count === 0)
        }
        ids={league.games.map((game) => game.id)}
        className={`${styles.button} favorite-icon`}
      />
      {/* <button className={``}>
        <IconFavorite />
      </button> */}
      <div className={styles.league}>
        <Image
          src={`https://admin.aibetguru.com/uploads/${league.league_cc}.svg`}
          className="logo-country"
          width={400}
          height={400}
          alt={league.league_name}
        />
        <span className={styles.name}>{league.league_name}</span>
      </div>
      <PinButton leagues={league} />
    </div>
  );
};
