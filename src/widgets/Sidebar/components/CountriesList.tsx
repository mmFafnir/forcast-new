import React, { FC, LegacyRef, memo, useEffect, useState } from "react";
import styles from "../styles/countries.list.module.scss";
import { useCountry } from "@/features/country";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import Image from "next/image";
import { Country } from "./ui/Country";
import { IconSearch } from "@/features/search";
import Loader from "@/shared/UI/Loader";

interface IProps {
  isOpen: boolean;
  listRef: LegacyRef<HTMLDivElement>;
}
const CountriesListMemo: FC<IProps> = ({ isOpen, listRef }) => {
  const { countries, loading, loadingMore, handleChangeSearch, setIsBottom } =
    useCountry();

  const [focusInput, setFocusInput] = useState<boolean>(false);

  return (
    <div
      className={styles.list}
      style={{ flex: !isOpen ? "0 0 0px" : "1 1 auto" }}
    >
      <div ref={listRef}>
        <div className={`${styles.search} ${focusInput ? styles.focus : ""}`}>
          <i>
            <IconSearch />
          </i>
          <input
            type="text"
            placeholder="Поиск"
            onChange={handleChangeSearch}
            onFocus={() => setFocusInput(true)}
            onBlur={() => setFocusInput(false)}
          />
        </div>
        {countries.length == 0 && !loading && (
          <p className={styles.empty}>Не найдено</p>
        )}
        <div className={styles.scroll}>
          <MyScrollbar
            className={`scrollbar-track-0`}
            bottomTrigger={200}
            onBottomScroll={(bottom) => {
              setIsBottom(bottom);
            }}
          >
            <div className="relative">
              {countries.map((item) => (
                <Country key={item.id} country={item} />
              ))}
              {loadingMore && (
                <Image
                  className={styles.loading}
                  src={"/loader-more.svg"}
                  width={50}
                  height={50}
                  alt="loading icon"
                />
              )}
              {loading && (
                <div className="loader-hover--fixed">
                  <Loader />
                </div>
              )}
            </div>
          </MyScrollbar>
        </div>
      </div>
    </div>
  );
};

export const CountriesList = memo(CountriesListMemo);
