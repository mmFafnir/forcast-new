"use client";
import React, { FC } from "react";
import styles from "../styles/event.module.scss";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import BestBet from "../ui/BestBet";
import { Wrapper } from "../ui/Wrapper";
import { TypeBet } from "@/entities/match";

interface IProps {
  bet: TypeBet;
}

const getColorLine = (id: number): string => {
  if (id === 4)
    return "linear-gradient(270deg, #CD7171 2.02%, #AC4444 101.92%)";
  if (id === 1)
    return "linear-gradient(270deg, #60A667 2.02%, #77C17F 101.92%)";
  return "transparent";
};

const getColorText = (id: number): string => {
  if (id === 4) return "#AC4444";
  if (id === 2) return "#FFD644";
  if (id === 1) return "#78D776";
  return "#fff";
};

export const Event: FC<IProps> = ({ bet }) => {
  console.log(bet);

  return (
    <Wrapper best={bet.best_bet === "Yes"}>
      <div
        style={{ background: getColorLine(bet.risk_id) }}
        className={styles.riskLine}
      ></div>
      <div className={styles.header}>
        <h3 className={styles.title}>Коэффициент {bet.odds}</h3>
        {bet.best_bet === "Yes" && <BestBet />}
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.item}>
            <p>Событие: </p>
            <h4>{bet.bet}</h4>
          </div>
          <div className={styles.item}>
            <p>Ставка: </p>
            <h4>{bet.event.show_name || bet.event.original_name}</h4>
          </div>
          <div className={styles.item}>
            <p>Риск: </p>
            <h4 style={{ color: getColorText(bet.risk_id) }}>
              {bet.risk.name}
            </h4>
          </div>
        </div>
        <div className={styles.text}>
          <MyScrollbar universal={true} autoHide scrollSize={"big"}>
            <p>{bet.why_best || bet.why}</p>
          </MyScrollbar>
        </div>
      </div>
    </Wrapper>
  );
};
