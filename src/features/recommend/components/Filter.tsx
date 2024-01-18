import { FC } from "react";
import Button from "@/shared/UI/Button";
import styles from "../styles/filter.module.scss";

const Filter: FC = () => {
  return (
    <div className={styles.body}>
      <Button type="text" active>
        Все
      </Button>
      <Button type="text">По стране</Button>
      <Button type="text">По лиге</Button>
    </div>
  );
};

export default Filter;
