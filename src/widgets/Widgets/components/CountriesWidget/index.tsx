"use client";
import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  useEffect,
  useState,
} from "react";
import styles from "./styles.module.scss";
import { IconSearch } from "@/features/search";
import { Country } from "./ui/Country";
import { getCountries } from "./api/getCountries";
import { positionValues } from "react-custom-scrollbars-2";
import { TypeCountry } from "./types/TypeCountry";
import MyScrollbar from "@/shared/UI/MyScrollbar";
const CountriesWidget = () => {
  const [data, setData] = useState<TypeCountry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>("/get_country");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const scrollBottom = (values: positionValues) => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      getCountries(`/get_country?search=${searchTerm}`).then((res) => {
        const nextUrl =
          res.next_page_url &&
          res.next_page_url.replace("https://admin.aibetguru.com/api/app", "");
        setNextPage(nextUrl);
        setData(res.data);
        setLoading(false);
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    if (!nextPage) return;
    setLoading(true);
    getCountries(nextPage).then((res) => {
      const nextUrl =
        res.next_page_url &&
        res.next_page_url.replace("https://admin.aibetguru.com/api/app", "");
      setNextPage(nextUrl);
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.country}>
      <div className={styles.search}>
        <IconSearch />
        <input
          type="text"
          placeholder="Название страны"
          onChange={handleChange}
        />
      </div>
      <div className={styles.list}>
        {loading && (
          <div className="loader-body">
            <span className="loader-spin"></span>
          </div>
        )}
        {data.length == 0 && <p className={styles.empty}>Не найдено</p>}
        <MyScrollbar
          universal={true}
          renderTrackHorizontal={() => <div></div>}
          autoHide
          onUpdate={scrollBottom}
        >
          {data.map((item) => (
            <Country key={item.id} item={item} />
          ))}
        </MyScrollbar>
      </div>
    </div>
  );
};

export default memo(CountriesWidget);
