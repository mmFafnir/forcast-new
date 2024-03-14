"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "../styles/leagueHeader.module.scss";
import Image from "next/image";
import { FavoriteAdd, PinButton } from "..";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setFavorite } from "../slice/favoritesSlice";
import { ILeagues } from "@/shared/types/leagues";
import Link from "next/link";
import { getSportName } from "@/shared/helper/getSportName";

interface IProps {
  league: ILeagues;
}
export const FavoritesLeagueHeader: FC<IProps> = ({ league }) => {
  const { favorites } = useTypeSelector((state) => state.favorites);
  const dispatch = useTypeDispatch();

  const [active, setActive] = useState<boolean>(
    league.games.find((game) => game.favorite_auth_user_count == 1)
      ? true
      : false
  );

  useEffect(() => {
    const active = league.games.find((game) => favorites.includes(game.id))
      ? true
      : false;

    setActive(active);
  }, [favorites]);

  useEffect(() => {
    const ids: number[] = [];
    league.games.forEach((game) => {
      if (game.favorite_auth_user_count === 1) {
        ids.push(game.id);
      }
    });
    dispatch(setFavorite(ids));
  }, []);

  return (
    <div className={styles.body}>
      <FavoriteAdd
        active={active}
        ids={league.games.map((game) => game.id)}
        className={`${styles.button} favorite-icon`}
      />
      <div className={styles.league}>
        {league.league_cc.length > 0 && (
          <Image
            src={`https://admin.aibetguru.com/uploads/${league.league_cc}.svg`}
            className="logo-country"
            width={400}
            height={400}
            alt={league.league_name}
          />
        )}
        <p className={styles.name}>
          {league.country && (
            <Link
              href={`/${getSportName(league.sport_id)}/${league.country_url}`}
            >
              {league.country?.translation || league.country?.name}:{" "}
            </Link>
          )}
          <Link href={`/soccer/${league.url}`}>
            {league.translate && league.translate.length > 0
              ? league.translate[0].translation
              : league.league_name}
          </Link>
        </p>
      </div>
      <PinButton leagues={league} />
    </div>
  );
};
