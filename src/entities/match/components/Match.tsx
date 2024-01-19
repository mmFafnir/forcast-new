import React from "react";
import styles from "../styles/match.module.scss";
import { IconFavorite } from "@/features/favorites";
import { Live } from "../ui/Live";
import { Commands } from "../ui/Commands";
import { Total } from "../ui/Total";
import { Views } from "../ui/Views";
import Link from "next/link";

export const Match = () => {
  return (
    <div className={`${styles.body}`}>
      <Link href={"/soccer/49192"} className={styles.href}></Link>
      <div className="flex item-center">
        <div className={`flex item-center js-between ${styles.first}`}>
          <button className={styles.favorites}>
            <IconFavorite />
          </button>
          <Live />
        </div>

        <Commands />
      </div>
      <div className={styles.last}>
        <Total color="rgba(152, 193, 100, 1)" />
        <Views />
      </div>
    </div>
  );
};
