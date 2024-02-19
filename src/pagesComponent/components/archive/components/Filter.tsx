"use client";

import Select from "@/shared/UI/Select";
import styles from "../styles/filter.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import { TypeCountry } from "@/shared/types/country";
import { TypeLeague } from "@/shared/types/leagues";
import { getCountryFilter } from "@/pagesComponent/api/archive/getFilterCountry";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import {
  setCountryFilter,
  setLeagueFilter,
  setSportFilter,
} from "@/features/filters/slice/filterSlice";

export const FilterArchive = () => {
  const dispatch = useTypeDispatch();

  const [sportValue, setSportValue] = useState<number | "">("");
  const [countryValue, setCountryValue] = useState<number | "">("");
  const [leagueValue, setLeagueValue] = useState<number | "">("");

  const [countryData, setCountryData] = useState<TypeCountry[]>([]);
  const [leagueData, setLeagueData] = useState<TypeLeague[]>([]);

  useEffect(() => {
    if (sportValue === "") {
      setCountryData([]);
      setLeagueData([]);
      setCountryValue("");

      return;
    }
    getCountryFilter(sportValue)
      .then((res) => {
        setCountryData(res.data);
        setCountryValue("");
      })
      .finally(() => {});
  }, [sportValue]);

  useEffect(() => {
    setLeagueValue("");
    if (countryValue === "") return setLeagueData([]);
    const country = countryData.find((item) => item.id === countryValue);
    setLeagueData(country?.league || []);
  }, [countryValue]);

  useEffect(() => {
    dispatch(setSportFilter(sportValue));
    dispatch(setCountryFilter(countryValue));
    dispatch(setLeagueFilter(leagueValue));
  }, [sportValue, countryValue, leagueValue]);

  return (
    <div className={styles.body}>
      <Select
        value={sportValue}
        setValue={(item) => setSportValue(Number(item.value) || "")}
        contentClass={styles.selectContent}
        styleBody={stylesSelect}
        data={[
          {
            label: "Все",
            value: "",
          },
          {
            label: "Футбол",
            value: 1,
          },
        ]}
      />
      <Select
        value={countryValue}
        setValue={(item) => setCountryValue(Number(item.value) || "")}
        styleBody={stylesSelect}
        contentClass={styles.selectContent}
        disabled={countryData.length === 0}
        data={[
          {
            label: "Все",
            value: "",
          },
          ...countryData.map((country) => ({
            label: country.translation || country.name,
            value: country.id,
          })),
        ]}
      />
      <Select
        value={leagueValue}
        setValue={(item) => setLeagueValue(Number(item.value) || "")}
        contentClass={styles.selectContent}
        styleBody={stylesSelect}
        disabled={leagueData.length === 0}
        data={[
          {
            label: "Все",
            value: "",
          },
          ...leagueData.map((league) => ({
            label: league.league_name,
            value: league.id,
          })),
        ]}
      />
    </div>
  );
};

const stylesSelect: CSSProperties = {
  flex: "0 1 150px",
  maxWidth: "150px",
  backgroundColor: "#292C36",
};
