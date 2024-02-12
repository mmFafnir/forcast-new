"use client";
import { FC } from "react";
import { FavoriteAdd, IconFavorite } from "@/features/favorites";
import { Live } from "../ui/Live";
import { Commands } from "../ui/Commands";
import { Total } from "../ui/Total";
import { Views } from "../ui/Views";
import Link from "next/link";
import styles from "../styles/match.module.scss";
import { getTimeStatusMatch } from "../scripts/getTimeStatusMatch";
import { TypeMatch } from "@/shared/types/match";

interface IProps {
  match: TypeMatch;
}

export const Match: FC<IProps> = ({ match }) => {
  const time = getTimeStatusMatch(match.real_date);
  console.log(match);
  return (
    <div className={`${styles.body}`}>
      <Link href={match.url || "/"} className={styles.href}></Link>
      <div className={styles.left}>
        <div className={`flex item-center js-between ${styles.first}`}>
          <FavoriteAdd
            active={match.favorite_auth_user_count === 1}
            ids={[match.id]}
            className={`${styles.favorites} favorite-icon`}
          />
          <div className={styles.time}>
            {time === "finish" ? (
              <p style={{ color: "#E98080" }}>Завершен</p>
            ) : time === "live" ? (
              <Live />
            ) : (
              <p>{match.real_time.slice(0, -3)}</p>
            )}
          </div>
        </div>
        <Commands away={match.away_team} home={match.home_team} />
      </div>
      <div className={styles.right}>
        {match.best_bet_card.length > 0 && (
          <Total bet={match.best_bet_card[0]} />
        )}
        <Views count={match.game_view_count} />
      </div>
    </div>
  );
};
