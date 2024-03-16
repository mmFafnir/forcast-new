"use client";
import { FC, useEffect, useState } from "react";
import styles from "../styles/recommend.module.scss";
import { Match } from "@/entities/match";
import { TypeMatch } from "@/shared/types/match";
import { getRecommend } from "@/pagesComponent/api/soccer/getRecommend";
import Loader from "@/shared/UI/Loader";
import Empty from "@/shared/UI/Empty";
import { Filter } from "./Filter";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IProps {
  data: TypeMatch[];
  id: number | string;
}

export const Recommend: FC<IProps> = ({ data, id }) => {
  const [matches, setMatches] = useState<TypeMatch[]>(data);
  const [filter, setFilter] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const { utcId } = useTypeSelector((state) => state.timezone);

  useEffect(() => {
    setLoading(true);
    getRecommend({
      id: id,
      country: filter === "" || filter === "country",
      league: filter === "" || filter === "league",
      utcId,
    })
      .then((res) => {
        setMatches(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter, utcId]);

  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Другие матчи</h2>
      <Filter value={filter} setValue={setFilter} />
      <div className={styles.content}>
        {loading && (
          <div className="loader-hover">
            <Loader />
          </div>
        )}
        {matches.length === 0 && <Empty />}
        {matches.map((match) => (
          <Match type="recommend" key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};
