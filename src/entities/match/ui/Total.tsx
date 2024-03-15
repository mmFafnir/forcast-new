import React, { FC } from "react";
import styles from "../styles/total.module.scss";
import IconCup from "../../../shared/icons/IconCup";
import { ToolkitSpan } from "@/features/Toolkit";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { CloseBestBet } from "./CloseBestBet";
import { TypeBet } from "@/shared/types/match";

interface IProps {
  bestBet: TypeBet;
  bets: TypeBet[];
  matchStatus: 0 | 1 | 3;
}
const color = "rgba(152, 193, 100, 1)";
export const Total: FC<IProps> = ({ bestBet, bets, matchStatus }) => {
  const { auth } = useTypeSelector((state) => state.auth);

  if (matchStatus == 3)
    return (
      <div className={styles.body}>
        {bets && bets.length > 0 && (
          <p className={styles.bet}>
            Всего: {bets.filter((card) => card.status == "1").length}/
            {bets.length}
          </p>
        )}
        {bestBet && (
          <p className={styles.bet}>
            Лучшая: {bestBet.status == "1" ? 1 : 0}/1
          </p>
        )}
      </div>
    );
  if (!auth) return <CloseBestBet />;
  return (
    <div className={styles.body}>
      {bestBet && (
        <ToolkitSpan className={styles.cup} title="Лучшая ставка">
          <IconCup />
        </ToolkitSpan>
      )}
      <p className={styles.name}>{bestBet.bet}</p>
      {bestBet.odds && (
        <p className={styles.odds} style={{ color }}>
          {bestBet.odds}
        </p>
      )}
    </div>
  );
};
