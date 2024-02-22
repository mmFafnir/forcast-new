"use client";
import { FC, memo } from "react";
import { Commands } from "../ui/Commands";
import { Views } from "../ui/Views";
import styles from "../styles/match.module.scss";
import { TypeBet, TypeMatch } from "@/shared/types/match";
import IconCup from "@/shared/icons/IconCup";
import useTimeStatus from "@/shared/hooks/useTimeStatus";
import dayjs from "dayjs";

interface IMatch extends TypeMatch {
  card: TypeBet[];
}

interface IProps {
  match: IMatch;
}

export const MatchArchiveMemo: FC<IProps> = ({ match }) => {
  const { time, hours, dateDefault } = useTimeStatus({
    matchTime: match.real_time_carbon,
  });
  return (
    <div className={`${styles.body} ${styles.archive}`}>
      <div className={styles.left}>
        <div className={`flex item-center js-between ${styles.first}`}>
          <div className={styles.time}>
            <p style={{ color: "#E98080" }}>
              {dayjs(dateDefault).format("DD/MM/YYYY")}
            </p>
            <p style={{ color: "#E98080" }}>{hours}</p>
          </div>
        </div>
        <Commands away={match.away_team} home={match.home_team} />
      </div>
      <div className={styles.right}>
        {match.card.length > 0 && (
          <div className={styles.bets}>
            {match.card.map((bet) => (
              <div key={bet.id} className={styles.bet}>
                {bet.best_bet && <IconCup />}
                <p>{bet.bet}</p>
                <p className={styles.betOdd}>{bet.odds}</p>
                {bet.status && (
                  <p
                    style={{
                      backgroundColor:
                        bet.status === "1" ? "#98C164" : "#EB6C6C",
                    }}
                    className={styles.betStatus}
                  ></p>
                )}
              </div>
            ))}
          </div>
        )}
        <Views count={match.game_view_count} />
      </div>
    </div>
  );
};

export const MatchArchive = memo(MatchArchiveMemo);
