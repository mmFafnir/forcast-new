import React, { FC } from "react";
import styles from "../styles/commands.module.scss";
import Image from "next/image";
import { TypeTeam } from "@/shared/types/match";
import CustomImage from "@/shared/UI/CustomImage";
import { getTranslationTeam } from "@/shared/helper/translation";

interface IProps {
  away: TypeTeam;
  home: TypeTeam;
}

export const Commands: FC<IProps> = ({ away, home }) => {
  return (
    <div className={styles.body}>
      <div className={styles.team}>
        <CustomImage
          src={`https://admin.aibetguru.com/${home.photo || "null.svg"}`}
          width={400}
          height={400}
          alt={getTranslationTeam(home)}
          className="logo-icon"
        />
        <p className={styles.name}>{getTranslationTeam(home)}</p>
      </div>
      <div className={styles.team}>
        <CustomImage
          src={`https://admin.aibetguru.com/${away.photo || "null.svg"}`}
          width={400}
          height={400}
          alt={getTranslationTeam(away)}
          className="logo-icon"
        />
        <p className={styles.name}>{getTranslationTeam(away)}</p>
      </div>
    </div>
  );
};
