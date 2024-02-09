import React, { FC } from "react";
import styles from "../styles/commands.module.scss";
import Image from "next/image";
import { TypeTeam } from "@/shared/types/match";

interface IProps {
  away: TypeTeam;
  home: TypeTeam;
}

export const Commands: FC<IProps> = ({ away, home }) => {
  return (
    <div className={styles.body}>
      <div className={styles.team}>
        <Image
          src={`https://admin.aibetguru.com/uploads/${home.team_id}.png`}
          width={400}
          height={400}
          alt={home.team_name}
          className="logo-icon"
        />
        <p className={styles.name}>{home.team_name}</p>
      </div>
      <div className={styles.team}>
        <Image
          src={`https://admin.aibetguru.com/uploads/${away.team_id}.png`}
          width={400}
          height={400}
          alt={away.team_name}
          className="logo-icon"
        />
        <p className={styles.name}>{away.team_name}</p>
      </div>
    </div>
  );
};
