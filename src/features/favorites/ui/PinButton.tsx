"use client";
import { FC, useState } from "react";
import IconPinFavorite from "../icons/IconPinFavorite";
import styles from "../styles/pin.module.scss";
import { togglePin } from "../api/togglePin";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { TypeLeague } from "@/widgets/Widgets/components/LeaguesWidget";
import {
  deleteDefaultLeagues,
  deleteLeagues,
  setLeagues,
} from "../slice/pinLeagueSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import IconLoader from "@/shared/icons/IconLoader";

interface IProps {
  leagues: Pick<
    TypeLeague,
    | "id"
    | "league_id"
    | "league_name"
    | "url"
    | "league_cc"
    | "user_pind_count"
    | "user_pind_admin_count"
  >;
}

export const PinButton: FC<IProps> = ({ leagues }) => {
  const dispatch = useTypeDispatch();
  const { auth } = useTypeSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [isPin, setIsPin] = useState<boolean>(
    leagues.user_pind_admin_count === 1 || leagues.user_pind_count === 1
  );

  const toggleSetLeague = (status: boolean) => {
    if (!status) {
      dispatch(deleteLeagues(leagues.id));
      dispatch(deleteDefaultLeagues(leagues.id));
    } else {
      dispatch(setLeagues(leagues));
    }
  };

  const onTogglePin = () => {
    setLoading(true);
    setIsPin((prev) => !prev);
    toggleSetLeague(!isPin);
    togglePin(leagues.id)
      .then((res) => {
        console.log(res);
        setIsPin(res === 1);
      })
      .catch(() => {
        toggleSetLeague(isPin);
        setIsPin((prev) => !prev);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!auth) return <></>;

  return (
    <button
      disabled={loading}
      className={`${styles.button} ${isPin ? styles.active : ""}`}
      onClick={onTogglePin}
    >
      {<IconPinFavorite />}
    </button>
  );
};
