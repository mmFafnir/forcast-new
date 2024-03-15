import React, { FC } from "react";
import styles from "../styles/commands.module.scss";
import Image from "next/image";
import { TypeTeam } from "@/shared/types/match";
import CustomImage from "@/shared/UI/CustomImage";

interface IProps {
  away: TypeTeam;
  home: TypeTeam;
}

export const Commands: FC<IProps> = ({ away, home }) => {
  return (
    <div className={styles.body}>
      <div className={styles.team}>
        <CustomImage
          src={`https://admin.aibetguru.com/uploads/${home.team_id}.png`}
          width={400}
          height={400}
          alt={home.team_name}
          className="logo-icon"
        />
        <p className={styles.name}>
          {home.translate && home.translate.length > 0
            ? home.translate[0].translation
            : home.team_name}
        </p>
      </div>
      <div className={styles.team}>
        <CustomImage
          src={`https://admin.aibetguru.com/uploads/${away.team_id}.png`}
          width={400}
          height={400}
          alt={away.team_name}
          className="logo-icon"
        />
        <p className={styles.name}>
          {away.translate && away.translate.length > 0
            ? away.translate[0].translation
            : away.team_name}
        </p>
      </div>
    </div>
  );
};
