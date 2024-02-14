import React, { FC } from "react";
import styles from "../styles/total.module.scss";
import IconCup from "../../../shared/icons/IconCup";
import { ToolkitSpan } from "@/features/Toolkit";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { CloseBestBet } from "./CloseBestBet";
import { TypeBet } from "@/shared/types/match";

interface IProps {
  bet: TypeBet;
}
const color = "rgba(152, 193, 100, 1)";
export const Total: FC<IProps> = ({ bet }) => {
  const { auth } = useTypeSelector((state) => state.auth);

  if (!auth) return <CloseBestBet />;
  return (
    <div className={styles.body}>
      {bet.best_bet && (
        <ToolkitSpan className={styles.cup} title="Лучшая ставка">
          <IconCup />
        </ToolkitSpan>
      )}
      <p className={styles.name}>{bet.bet}</p>
      {bet.odds && (
        <p className={styles.odds} style={{ color }}>
          {bet.odds}
        </p>
      )}
    </div>
  );
};
