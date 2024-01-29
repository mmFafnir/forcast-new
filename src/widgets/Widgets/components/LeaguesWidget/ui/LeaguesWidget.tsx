"use client";
import { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import Image from "next/image";
import { IFetchLeague } from "../types/TypeLeague";
import { getLeagues } from "../api/getLeagues";
import { PinButton } from "@/features/favorites";
import Loader from "@/shared/UI/Loader";

export const LeaguesWidget = () => {
  const [data, setData] = useState<IFetchLeague[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getLeagues()
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && (
        <div className="loader-body">
          <Loader />
        </div>
      )}
      {data.length === 0 && (
        <div className={styles.empty}>
          <p>У вас нет избранных лиг, вы можете их закрепить</p>
        </div>
      )}
      {data.map((item) => (
        <div
          key={item.id}
          className={styles.item}
          title={item.league.league_name}
        >
          <Image
            className="logo-icon"
            src={`https://admin.aibetguru.com/uploads/${item.league.league_id}.png`}
            width={400}
            height={400}
            alt={item.league.league_name}
          />
          <p className={styles.title}>{item.league.league_name}</p>
          <PinButton active={item.status === "1"} />
        </div>
      ))}
    </>
  );
};
