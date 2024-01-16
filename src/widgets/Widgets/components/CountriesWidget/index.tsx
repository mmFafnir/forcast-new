"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IconSearch } from "@/features/search";
import { Country } from "./ui/Country";
import { getCountries } from "./api/getCountries";
import Scrollbars from "react-custom-scrollbars-2";
import { TypeCountry } from "./types/TypeCountry";
const CountriesWidget = () => {
  const [isMore, setIsMore] = useState<boolean>(false);
  const [data, setData] = useState<TypeCountry[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("/get_country");

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
        <Scrollbars universal={true} autoHide>
          {data.map((item) => (
            <Country key={item.id} item={item} />
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

export default CountriesWidget;
