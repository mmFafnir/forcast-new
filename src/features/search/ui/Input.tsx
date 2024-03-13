"use client";
import { FC, memo, useEffect, useRef, useState } from "react";
import { IconSearch } from "../icons/IconSearch";
import styles from "../styles/input.module.scss";

interface IProps {
  onSearch: (value: string) => void;
  focus?: boolean;
  searchRef: (ref: HTMLInputElement | null) => void;
}
export const Input: FC<IProps> = ({ onSearch, focus = false, searchRef }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const search = () => onSearch(value);

  useEffect(() => {
    if (!focus || !inputRef.current) return;
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, [focus]);

  useEffect(() => {
    console.log("ref", searchRef);
    searchRef(inputRef.current);
  }, []);
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

// export const Input = InputMemo;
