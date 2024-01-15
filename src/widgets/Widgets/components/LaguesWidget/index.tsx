import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const LeaguesWidget = () => {
  return (
    <div>
      {new Array(9).fill(null).map((item, index) => (
        <div key={index} className={styles.item}>
          <Image
            className="logo-icon"
            src={"/country-icon.svg"}
            width={16}
            height={16}
            alt="Название лиги"
          />
          <p className={styles.title}>Название лиги</p>
        </div>
      ))}
    </div>
  );
};

export default LeaguesWidget;
