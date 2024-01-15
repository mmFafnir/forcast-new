import React from "react";
import styles from "./styles.module.scss";
import { IconSearch } from "@/features/search";
import { Country } from "./ui/Country";
const CountriesWidget = () => {
  return (
    <div className={styles.country}>
      <div className={styles.search}>
        <IconSearch />
        <input type="text" placeholder="Название страны" />
      </div>
      <div className={styles.list}>
        <Country />
        <Country />
        <Country />
        <Country />
      </div>
    </div>
  );
};

export default CountriesWidget;
