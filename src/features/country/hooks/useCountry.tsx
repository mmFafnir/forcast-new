import { TypeCountry } from "@/shared/types/country";
import { ChangeEvent, useEffect, useState } from "react";
import { getCountries } from "../api/getCountries";

interface IRes {
  countries: TypeCountry[];
  loading: boolean;
  loadingMore: boolean;
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  setIsBottom: (value: boolean) => void;
  search: string;
}
export const useCountry = (): IRes => {
  const [data, setData] = useState<TypeCountry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [nextPage, setNextPage] = useState<string | null>("/get_country");
  const [isBottom, setIsBottom] = useState<boolean>(false);

  const fetchCountries = () => {
    if (nextPage === null) return;
    setLoadingMore(true);
    getCountries(nextPage)
      .then((res) => {
        const nextUrl =
          res.next_page_url &&
          res.next_page_url.replace("http://admin.aibetguru.com/api/app", "");

        setNextPage(nextUrl);
        setData((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (loadingMore) return;
    if (!isBottom) return;
    fetchCountries();
  }, [isBottom]);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      getCountries(`/get_country?search=${search}`).then((res) => {
        const nextUrl =
          res.next_page_url &&
          res.next_page_url.replace("https://admin.aibetguru.com/api/app", "");
        setNextPage(nextUrl);
        setData(res.data);
        setIsBottom(false);
        setLoading(false);
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (!nextPage) return;
    setLoading(true);
    getCountries(nextPage).then((res) => {
      const nextUrl = res.next_page_url
        ? res.next_page_url.replace("http://admin.aibetguru.com/api/app", "")
        : null;

      setNextPage(nextUrl);
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return {
    countries: data,
    loading,
    loadingMore,
    handleChangeSearch,
    search,
    setIsBottom,
  };
};
