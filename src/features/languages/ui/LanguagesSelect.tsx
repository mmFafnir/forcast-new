"use client";

import React from "react";
import styles from "../styles/select.module.scss";
import svg from "../assets/translate.svg";
import Image from "next/image";

export const LanguagesSelect = () => {
  // TODO: доделать селект
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <Image src={svg} width={18} alt="translate icon" />
        <p>RU</p>
      </div>
      <div className={styles.body}></div>
    </div>
  );
};
