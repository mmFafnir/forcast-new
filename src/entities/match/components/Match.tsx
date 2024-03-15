"use client";
import { FC } from "react";
import { FavoriteAdd } from "@/features/favorites";
import { Commands } from "../ui/Commands";
import { Total } from "../ui/Total";
import { Views } from "../ui/Views";
import Link from "next/link";
import styles from "../styles/match.module.scss";
import { TypeMatch } from "@/shared/types/match";
import { getSportName } from "@/shared/helper/getSportName";
import useTimeStatus from "@/shared/hooks/useTimeStatus";

interface IProps {
  match: TypeMatch;
}

export const Match: FC<IProps> = ({ match }) => {
  const { status, hours } = useTimeStatus({
    matchTime: match.real_time_carbon,
  });

  return (
    <div className={`${styles.body}`}>
      <Link
        href={match.url ? `/${getSportName(match.sport_id)}/${match.url}` : "/"}
        className={styles.href}
      ></Link>
      <div className={styles.left}>
        <div className={`flex item-center js-between ${styles.first}`}>
          <FavoriteAdd
            active={match.favorite_auth_user_count === 1}
            ids={[match.id]}
            className={`${styles.favorites} favorite-icon`}
          />
          <div className={styles.time}>
            {match.time_status == 3 ? (
              <p style={{ color: "#E98080" }}>Завершен</p>
            ) : (
              <p>{hours}</p>
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
