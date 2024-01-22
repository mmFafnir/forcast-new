import { FC } from "react";
import styles from "../styles/recommend.module.scss";
import Filter from "./Filter";
import { Match } from "@/entities/match";

export const Recommend: FC = () => {
  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Другие матчи</h2>
      <Filter />
      <div className={styles.content}>
        {/* <Match />
        <Match />
        <Match />
        <Match />
        <Match /> */}
      </div>
    </div>
  );
};
