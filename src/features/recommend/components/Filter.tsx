import { FC } from "react";
import Button from "@/shared/UI/Button";
import styles from "../styles/filter.module.scss";

const filters = [
  {
    label: "все",
    value: "",
  },
  {
    label: "По стране",
    value: "country",
  },
  {
    label: "По лиге",
    value: "league",
  },
];

interface IProps {
  setValue: (value: string) => void;
  value: string;
}

const Filter: FC<IProps> = ({ setValue, value }) => {
  return (
    <div className={styles.body}>
      {filters.map((fil) => (
        <Button
          key={fil.value}
          type="text"
          active={fil.value === value}
          onClick={() => setValue(fil.value)}
        >
          {fil.label}
        </Button>
      ))}
    </div>
  );
};

export default Filter;
