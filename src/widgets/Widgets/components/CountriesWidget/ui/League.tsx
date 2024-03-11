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
        href={`/soccer/${item.url}`}
        className={styles.name}
      >
        {item.translate && item.translate.length > 0
          ? item.translate[0].translation
          : item.league_name}
      </Link>
      <PinButton leagues={item} />
    </div>
  );
};
