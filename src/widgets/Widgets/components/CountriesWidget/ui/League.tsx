import React, { FC } from "react";
import styles from "../styles/league.module.scss";
import { PinButton } from "@/features/favorites";
import { TypeLeague } from "../../LeaguesWidget/types/TypeLeague";
import Link from "next/link";

interface IProps {
  item: TypeLeague;
}

export const League: FC<IProps> = ({ item }) => {
  return (
    <div className={styles.item}>
      <Link title={item.league_name} href={"/"} className={styles.name}>
        {item.league_name}
      </Link>
      <PinButton leagues={item} />
    </div>
  );
};
