"use client";
import { FC } from "react";
import { Input } from "../ui/Input";
import { Sports } from "../ui/Sports";
import styles from "../styles/search.module.scss";
import { Found } from "../ui/Found";

export const SearchBlock: FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Input />
        <Sports />
      </div>
      <div>
        <Found />
      </div>
    </div>
  );
};
