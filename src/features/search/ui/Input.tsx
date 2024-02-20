"use client";
import { FC, useEffect, useRef, useState } from "react";
import { IconSearch } from "../icons/IconSearch";
import styles from "../styles/input.module.scss";

interface IProps {
  onSearch: (value: string) => void;
  focus?: boolean;
}
export const Input: FC<IProps> = ({ onSearch, focus = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const search = () => onSearch(value);

  useEffect(() => {
    if (!focus || !inputRef.current) return;
    console.log(inputRef.current);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, [focus]);

  return (
    <div className={styles.body}>
      <button onClick={search}>
        <IconSearch />
      </button>
      <input
        ref={inputRef}
        onKeyDown={(e) => e.code == "Enter" && search()}
        onInput={(e) => setValue(e.currentTarget.value)}
        type="text"
        placeholder="Начни вводить название"
      />
    </div>
  );
};
