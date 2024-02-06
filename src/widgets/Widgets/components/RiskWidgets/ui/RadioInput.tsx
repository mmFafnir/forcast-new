import { FC } from "react";
import styles from "../styles/radio.module.scss";

interface IProps {
  id: string;
  name: string;
  title: string;
  color: string;
  checked?: boolean;
  setRisk: (risk: string | number) => void;
  value: string | number;
}
export const RadioInput: FC<IProps> = ({
  name,
  title,
  color,
  id,
  checked = false,
  value,
  setRisk,
}) => {
  return (
    <div className={styles.body}>
      <input
        onInput={() => setRisk(value)}
        type="radio"
        name={name}
        id={id}
        defaultChecked={checked}
        value={value}
      />
      <label className={styles.label} htmlFor={id}>
        <span
          className={styles.color}
          style={{ backgroundColor: color }}
        ></span>
        <span className={styles.text}>{title}</span>
      </label>
    </div>
  );
};
