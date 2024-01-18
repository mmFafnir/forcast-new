"use client";
import React, { FC } from "react";
import styles from "../styles/event.module.scss";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import BestBet from "../ui/BestBet";
import { Wrapper } from "../ui/Wrapper";

interface IProps {
  odd: string;
  event: string;
  bet: string;
  risk: string;
  text: string;
  bestBet?: boolean;
}

export const Event: FC<IProps> = ({
  odd,
  event,
  bet,
  risk,
  text,
  bestBet = false,
}) => {
  return (
    <Wrapper best={bestBet}>
      <div className={styles.header}>
        <h3 className={styles.title}>Коэффициент {odd}</h3>
        {bestBet && <BestBet />}
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.item}>
            <p>Событие: </p>
            <h4>{event}</h4>
          </div>
          <div className={styles.item}>
            <p>Ставка: </p>
            <h4>{bet}</h4>
          </div>
          <div className={styles.item}>
            <p>Риск: </p>
            <h4 style={{ color: "#D84545" }}>{risk}</h4>
          </div>
        </div>
        <div className={styles.text}>
          <MyScrollbar universal={true}>
            <p>{text}</p>
          </MyScrollbar>
        </div>
      </div>
    </Wrapper>
  );
};
