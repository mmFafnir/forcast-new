/* eslint-disable react/jsx-key */
"use client";
import { FC, useEffect, useState } from "react";
import { getLeagues } from "../api/getLeagues";
import { PinButton, usePinLeagues } from "@/features/favorites";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setDefaultLeague } from "@/features/favorites/slice/pinLeagueSlice";
import { TypeLeague } from "@/shared/types/leagues";
import Link from "next/link";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import Loader from "@/shared/UI/Loader";
import styles from "../styles/league.widget.module.scss";
import SportsIcon from "@/shared/icons/sports";
import IconX from "@/shared/icons/IconX";
import { closeWidgets } from "@/features/closeSidebar/slice/closeSidebarSlice";

interface IPropsItem {
  item: TypeLeague;
}

const ItemLeagues: FC<IPropsItem> = ({ item }) => {
  return (
    <div key={item.id} className={styles.item} title={item.league_name}>
      <Link href={`/soccer/${item.url}`}>
        <span>
          {item.translate && item.translate.length > 0
            ? item.translate[0].translation
            : item.league_name}
        </span>
      </Link>
      <PinButton leagues={{ ...item, user_pind_count: 1 }} />
    </div>
  );
};

export const LeaguesWidget = () => {
  const dispatch = useTypeDispatch();
  const data = usePinLeagues();

  const closeSidebar = () => dispatch(closeWidgets());

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getLeagues()
      .then((res) => {
        const items = res.map((lig) => lig.league);
        dispatch(setDefaultLeague(items));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <p>Популярные лиги</p>
        <button onClick={closeSidebar}>
          <IconX />
        </button>
      </div>
      <div className={styles.scroll}>
        <MyScrollbar className={`scrollbar-track-0`}>
          {loading && (
            <div className="loader-body">
              <Loader />
            </div>
          )}
          <div className={styles.list}>
            {data.map((item) => (
              <div key={item.sportId} className={styles.sport}>
                <div className={styles.sportHeader}>
                  <SportsIcon icon={`${item.sportId}`} />
                  <p>{item.sport}</p>
                </div>
                <div className={styles.list}>
                  {item.leagues.map((lig) => (
                    <ItemLeagues item={lig} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MyScrollbar>
      </div>
    </div>
  );
};
