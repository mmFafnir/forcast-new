"use client";
import { FC, useEffect, useState } from "react";
import styles from "../styles.module.scss";
import { getLeagues } from "../api/getLeagues";
import { PinButton } from "@/features/favorites";
import Loader from "@/shared/UI/Loader";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { setDefaultLeague } from "@/features/favorites/slice/pinLeagueSlice";
import { TypeLeague } from "@/shared/types/leagues";
import Link from "next/link";
import CustomImage from "@/shared/UI/CustomImage";

interface IPropsItem {
  item: TypeLeague;
}
const ItemLeagues: FC<IPropsItem> = ({ item }) => {
  return (
    <div key={item.id} className={styles.item} title={item.league_name}>
      <CustomImage
        className="logo-icon"
        src={`https://admin.aibetguru.com/photo/league/${item.photo}`}
        width={400}
        height={400}
        alt={item.league_name}
      />
      <p className={styles.title}>
        <Link href={`/soccer/${item.url}`}>
          {item.translate && item.translate.length > 0
            ? item.translate[0].translation
            : item.league_name}
        </Link>
      </p>
      <PinButton leagues={{ ...item, user_pind_count: 1 }} />
    </div>
  );
};

export const LeaguesWidget = () => {
  const dispatch = useTypeDispatch();
  const { pinDefaultLeagues, pinUserLeagues } = useTypeSelector(
    (state) => state.pinLeague
  );
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
    <>
      <MyScrollbar className="scrollbar-track-0">
        {loading && (
          <div className="loader-body">
            <Loader />
          </div>
        )}
        {[...pinUserLeagues, ...pinDefaultLeagues].length === 0 && !loading && (
          <div className={styles.empty}>
            <p>У вас нет избранных лиг, вы можете их закрепить</p>
          </div>
        )}
        {pinUserLeagues.map((item) => (
          <ItemLeagues key={item.id} item={item} />
        ))}
        {pinDefaultLeagues.map((item) => (
          <ItemLeagues key={item.id} item={item} />
        ))}
      </MyScrollbar>
    </>
  );
};
