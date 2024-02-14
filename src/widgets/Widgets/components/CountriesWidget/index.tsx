"use client";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { IconSearch } from "@/features/search";
import { Country } from "./ui/Country";
import { getCountries } from "./api/getCountries";
import { TypeCountry } from "./types/TypeCountry";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import Loader from "@/shared/UI/Loader";
import styles from "./styles.module.scss";

const CountriesWidget = () => {
  const [data, setData] = useState<TypeCountry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>("/get_country");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isBottom, setIsBottom] = useState<boolean>(false);

  const fetchCountries = () => {
    if (nextPage === null) return;

    setLoadingMore(true);

    getCountries(nextPage)
      .then((res) => {
        const nextUrl =
          res.next_page_url &&
          res.next_page_url.replace("https://admin.aibetguru.com/api/app", "");

        setNextPage(nextUrl);
        // setData((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onScroll = (bottom: boolean) => {
    console.log(bottom && !loadingMore);
    if (bottom) {
      console.log(nextPage);
      fetchCountries();
    }
  };

  useEffect(() => {
    if (!isBottom) return;
    console.log(nextPage);
    fetchCountries();
  }, [isBottom]);

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
      const nextUrl = res.next_page_url;
      // res.next_page_url.replace("https://admin.aibetguru.com/api/app", "");
      console.log(nextUrl);
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
      <div className={`${styles.list} scrollbar`}>
        {loading && (
          <div className="loader-body">
            <Loader />
          </div>
        )}
        {data.length == 0 && !loading && (
          <p className={styles.empty}>Не найдено</p>
        )}
        <MyScrollbar
          className="scrollbar-track-0"
          onBottomScroll={(bottom) => setIsBottom(bottom)}
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
