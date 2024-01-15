import React from "react";
import styles from "../styles/commands.module.scss";
import Image from "next/image";
export const Commands = () => {
  return (
    <div className={styles.body}>
      <div className={styles.team}>
        <Image
          src={"/country-icon.svg"}
          width={16}
          height={16}
          alt="Команда 1"
          className="logo-icon"
        />
        <p className={styles.name}>Команда 1</p>
      </div>
      <div className={styles.team}>
        <Image
          src={"/country-icon.svg"}
          width={16}
          height={16}
          alt="Команда 1"
          className="logo-icon"
        />
        <p className={styles.name}>Команда 1</p>
      </div>
    </div>
  );
};
