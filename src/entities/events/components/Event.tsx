"use client";
import React, { FC, useRef } from "react";
import styles from "../styles/event.module.scss";
import BestBet from "../ui/BestBet";
import { Wrapper } from "../ui/Wrapper";
import { Status } from "../ui/Status";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import IconArrow from "@/shared/icons/IconArrow";
import Button from "@/shared/UI/Button";
import { TypeBet } from "@/shared/types/match";

interface IProps {
  bet: TypeBet;
  gameStatus: 0 | 1 | 3;
}

const getColorText = (id: number): string => {
  if (id === 4) return "#AC4444";
  if (id === 2) return "#FFD644";
  if (id === 1) return "#78D776";
  return "#fff";
};

const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: {
    transform: `scale(1, -1)`,
  },
};

const defaultHeight = 160;

export const Event: FC<IProps> = ({ bet, gameStatus }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const { iconStyle, onToggle, currentHeight } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultHeight,
    defaultOpen: false,
  });
  return (
    <Wrapper best={bet.best_bet === "Yes"}>
      <div className={styles.header}>
        {gameStatus == 3 && (
          <span className={styles.status}>
            <Status played={bet.status == "1"} />
          </span>
        )}
        <h3 className={styles.title}>Коэффициент {bet.odds}</h3>
        {bet.best_bet === "Yes" && <BestBet />}
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.item}>
            <p>Событие: </p>
            <h4>
              {bet.event.translate && bet.event.translate.length > 0
                ? bet.event.translate[0].translation
                : bet.event.show_name || bet.event.original_name}
            </h4>
          </div>
          <div className={styles.item}>
            <p>Ставка: </p>
            <h4>{bet.bet}</h4>
          </div>
          <div className={styles.item}>
            <p>Риск: </p>
            <h4 style={{ color: getColorText(bet.risk_id) }}>
              {bet.risk.translate && bet.risk.translate.length > 0
                ? bet.risk.translate[0].translation
                : bet.risk.name}
            </h4>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.text} style={{ height: currentHeight + "px" }}>
            <p ref={listRef}>
              {bet.why_best || bet.why} {bet.why_best || bet.why}{" "}
              {bet.why_best || bet.why}{" "}
            </p>
          </div>
          {listRef.current && listRef.current.clientHeight >= defaultHeight && (
            <Button type="text" className={styles.accorBtn} onClick={onToggle}>
              <span style={iconStyle}>
                <IconArrow />
              </span>
            </Button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
