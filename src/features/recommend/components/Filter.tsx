import { FC } from "react";
import Button from "@/shared/UI/Button";
import styles from "../styles/filter.module.scss";

const filters = [
  {
    label: "Все",
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
  isCountry: boolean;
}

export const Filter: FC<IProps> = ({ setValue, value, isCountry }) => {
  if (!isCountry) return <></>;
  return (
    <div className={styles.body}>
      {filters.map((fil) => {
        return (
          <Button
            key={fil.value}
            type="text"
            active={fil.value === value}
            onClick={() => setValue(fil.value)}
          >
            {fil.label}
          </Button>
        );
      })}
    </div>
  );
};
