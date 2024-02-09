"use client";
import { FC, useState } from "react";
import { IconSearch } from "../icons/IconSearch";
import styles from "../styles/input.module.scss";

interface IProps {
  onSearch: (value: string) => void;
}
export const Input: FC<IProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>("");

  const search = () => onSearch(value);

  return (
    <div className={styles.body}>
      <button onClick={search}>
        <IconSearch />
      </button>
      <input
        onKeyDown={(e) => e.code == "Enter" && search()}
        onInput={(e) => setValue(e.currentTarget.value)}
        type="text"
        placeholder="Начни вводить название"
      />
    </div>
  );
};
