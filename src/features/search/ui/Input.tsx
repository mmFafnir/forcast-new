"use client";
import { FC } from "react";
import { IconSearch } from "../icons/IconSearch";
import styles from "../styles/input.module.scss";

export const Input: FC = () => {
  return (
    <div className={styles.body}>
      <IconSearch />
      <input type="text" placeholder="Начни вводить название" />
    </div>
  );
};
