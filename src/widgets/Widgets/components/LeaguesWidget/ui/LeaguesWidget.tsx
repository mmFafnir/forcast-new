"use client";
import { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import Image from "next/image";
import { IFetchLeague } from "../types/TypeLeague";
import { getLeagues } from "../api/getLeagues";
import { PinButton } from "@/features/favorites";

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
      {/* {data.length === 0 && (
        <div className="loader-body">
          <span className="loader-spin"></span>
        </div>
      )} */}
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
      {new Array(10).fill(null).map((item, index) => (
        <div key={index} className={styles.item} title={"sadsadasd"}>
          <Image
            className="logo-icon"
            src={`/country-icon`}
            width={400}
            height={400}
            alt={"asdsadsad"}
          />
          <p className={styles.title}>{"asdsadasd"}</p>
          <PinButton active={true} />
        </div>
      ))}
    </>
  );
};
