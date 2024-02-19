"use client";
import { FC, memo } from "react";
import { Live } from "../ui/Live";
import { Commands } from "../ui/Commands";
import { Views } from "../ui/Views";
import styles from "../styles/match.module.scss";
import { getTimeStatusMatch } from "../scripts/getTimeStatusMatch";
import { TypeBet, TypeMatch } from "@/shared/types/match";
import IconCup from "@/shared/icons/IconCup";

interface IMatch extends TypeMatch {
  card: TypeBet[];
}

interface IProps {
  match: IMatch;
}

export const MatchArchiveMemo: FC<IProps> = ({ match }) => {
  const time = getTimeStatusMatch(match.real_date);
  return (
    <div className={`${styles.body}`}>
      <div className={styles.left}>
        <div className={`flex item-center js-between ${styles.first}`}>
          <div className={styles.time}>
            {time === "finish" ? (
              <>
                <p style={{ color: "#E98080" }}>{match.real_date}</p>
                <p style={{ color: "#E98080" }}>
                  {match.real_time.slice(0, -3)}
                </p>
              </>
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
        <div className={styles.bets}>
          {match.card.map((bet) => (
            <div key={bet.id} className={styles.bet}>
              {bet.best_bet && <IconCup />}
              <p>{bet.bet}</p>
              <p className={styles.betOdd}>{bet.odds}</p>
              {bet.status && (
                <p
                  style={{
                    backgroundColor: bet.status === "1" ? "#98C164" : "#EB6C6C",
                  }}
                  className={styles.betStatus}
                ></p>
              )}
            </div>
          ))}
        </div>
        <Views count={match.game_view_count} />
      </div>
    </div>
  );
};

export const MatchArchive = memo(MatchArchiveMemo);
