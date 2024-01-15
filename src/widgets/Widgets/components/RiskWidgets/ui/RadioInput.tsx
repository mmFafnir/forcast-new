import { FC } from "react";
import styles from "../styles/radio.module.scss";

interface IProps {
  id: string;
  name: string;
  title: string;
  color: string;
}
export const RadioInput: FC<IProps> = ({ name, title, color, id }) => {
  return (
    <div className={styles.body}>
      <input type="radio" name={name} id={id} />
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
