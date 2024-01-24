"use client";
import { FC } from "react";
import { IconFavorite } from "@/features/favorites";
import { Live } from "../ui/Live";
import { Commands } from "../ui/Commands";
import { Total } from "../ui/Total";
import { Views } from "../ui/Views";
import Link from "next/link";
import { TypeMatch } from "..";
import styles from "../styles/match.module.scss";
import { getTimeStatusMatch } from "../scripts/getTimeStatusMatch";

interface IProps {
  match: TypeMatch;
}

export const Match: FC<IProps> = ({ match }) => {
  const time = getTimeStatusMatch(match.real_date);
  console.log(match);
  return (
    <div className={`${styles.body}`}>
      <Link href={match.url} className={styles.href}></Link>
      <div className={styles.left}>
        <div className={`flex item-center js-between ${styles.first}`}>
          <button className={styles.favorites}>
            <IconFavorite />
          </button>
          {time === "finish" ? (
            <p style={{ color: "#E98080" }}>Завершен</p>
          ) : time === "live" ? (
            <Live />
          ) : (
            time
          )}
        </div>

        <Commands away={match.away_team} home={match.home_team} />
      </div>
      <div className={styles.right}>
        {match.best_bet_card.length > 0 && (
          <Total bet={match.best_bet_card[0]} />
        )}
        <Views />
      </div>
    </div>
  );
};
