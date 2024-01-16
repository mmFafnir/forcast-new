import React, { FC } from "react";
import styles from "../styles/league.module.scss";
import { PinButton } from "@/features/favorites";
import { TypeLeague } from "../../LeaguesWidget/types/TypeLeague";

interface IProps {
  item: TypeLeague;
}

export const League: FC<IProps> = ({ item }) => {
  return (
    <div className={styles.item}>
      <p className={styles.name} title={item.league_name}>
        {item.league_name}
      </p>
      <PinButton active={item.favorit === "1"} />
    </div>
  );
};
