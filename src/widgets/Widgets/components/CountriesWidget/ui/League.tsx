import React, { FC } from "react";
import styles from "../styles/league.module.scss";
import { PinButton } from "@/features/favorites";
import Link from "next/link";
import { TypeLeague } from "@/shared/types/leagues";

interface IProps {
  item: TypeLeague;
}

export const League: FC<IProps> = ({ item }) => {
  return (
    <div className={styles.item}>
      <Link
        title={item.league_name}
        href={`/soccer/${item.league_cc}/${item.url}`}
        className={styles.name}
      >
        {item.league_name}
      </Link>
      <PinButton leagues={item} />
    </div>
  );
};
