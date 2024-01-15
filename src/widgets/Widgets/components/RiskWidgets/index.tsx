import React from "react";
import styles from "./styles.module.scss";
import { RadioInput } from "./ui/RadioInput";
import { Progress } from "./ui/Progress";

const RiskWidgets = () => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <p>Статистика S Æ A-XI по Германии</p>
      </div>
      <div>
        <div className={styles.tabs}>
          <RadioInput
            id="2"
            title="Общее"
            name="risk"
            color="rgba(217, 217, 217, 1)"
          />
          <RadioInput
            id="3"
            title="Общее"
            name="risk"
            color="rgba(162, 208, 125, 1)"
          />
          <RadioInput
            id="1"
            title="Общее"
            name="risk"
            color="rgba(227, 215, 104, 1)"
          />
          <RadioInput
            id="9"
            title="Общее"
            name="risk"
            color="rgba(208, 125, 125, 1)"
          />
        </div>
        <div className={styles.content}>
          <Progress color="#57D0A5" title="Всего" total={300} available={94} />
          <Progress color="#9C44BB" title="Лучшие" total={300} available={94} />
          <div className={styles.odds}>
            <p>Средний коэф</p>
            <p>1.8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskWidgets;
