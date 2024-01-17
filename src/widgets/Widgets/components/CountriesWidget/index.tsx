"use client";
import { memo, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IconSearch } from "@/features/search";
import { Country } from "./ui/Country";
import { getCountries } from "./api/getCountries";
import { positionValues } from "react-custom-scrollbars-2";
import { TypeCountry } from "./types/TypeCountry";
import MyScrollbar from "@/shared/UI/MyScrollbar";
const CountriesWidget = () => {
  const [data, setData] = useState<TypeCountry[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("/get_country");

  const scrollBottom = (values: positionValues) => {
    console.log(values.top);
    if (values.top !== 1) return;
    fetchCountries(nextPage);
  };

  const fetchCountries = (page: string | null) => {
    if (page === null) return;
    getCountries(page).then((res) => {
      const nextUrl =
        res.next_page_url &&
        res.next_page_url.replace("https://admin.aibetguru.com/api/app", "");
      setNextPage(nextUrl);
      setData((prev) => [...prev, ...res.data]);
    });
  };

  useEffect(() => {
    if (!nextPage) return;
    getCountries(nextPage).then((res) => {
      const nextUrl =
        res.next_page_url &&
        res.next_page_url.replace("https://admin.aibetguru.com/api/app", "");
      setNextPage(nextUrl);
      setData(res.data);
    });
  }, []);
  return (
    <div className={styles.country}>
      <div className={styles.search}>
        <IconSearch />
        <input type="text" placeholder="Название страны" />
      </div>
      <div className={styles.list}>
        {data.length === 0 && (
          <div className="loader-body">
            <span className="loader-spin"></span>
          </div>
        )}
        <MyScrollbar universal={true} autoHide onUpdate={scrollBottom}>
          {data.map((item) => (
            <Country key={item.id} item={item} />
          ))}
        </MyScrollbar>
      </div>
    </div>
  );
};

export default memo(CountriesWidget);
