"use client";
import { FC } from "react";
import styles from "../styles/sports.module.scss";
import Button from "@/shared/UI/Button";
export const Sports: FC = () => {
  return (
    <div className={styles.body}>
      <Button type="gray" className={styles.title}>
        Футбол
      </Button>
    </div>
  );
};
