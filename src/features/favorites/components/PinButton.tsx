"use client";
import { FC, useEffect, useState } from "react";
import IconPinFavorite from "../icons/IconPinFavorite";
import styles from "../styles/pin.module.scss";
import { togglePin } from "../api/togglePin";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import {
  deleteDefaultLeagues,
  deleteLeagues,
  setLeagues,
} from "../slice/pinLeagueSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypeLeague } from "@/shared/types/leagues";
import { setClick, setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";

interface IProps {
  leagues: TypeLeague;
}

export const PinButton: FC<IProps> = ({ leagues }) => {
  const { auth } = useTypeSelector((state) => state.auth);
  const { pinDefaultLeagues, pinUserLeagues } = useTypeSelector(
    (state) => state.pinLeague
  );
  const dispatch = useTypeDispatch();

  const [loading, setLoading] = useState(false);

  const [isPin, setIsPin] = useState<boolean>(
    leagues.user_pind_admin_count == 1 || leagues.user_pind_count == 1
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

  const onOpenLogin = () => {
    dispatch(setClick("pin"));
    dispatch(setModal(EnumModals.LOGIN));
  };

  useEffect(() => {
    if (!isPin) return;
    if (
      ![...pinUserLeagues, ...pinDefaultLeagues].find(
        (pin) => pin.id === leagues.id
      )
    ) {
      setIsPin(false);
    }
  }, [pinUserLeagues, pinDefaultLeagues]);

  useEffect(() => {
    setIsPin(
      leagues.user_pind_admin_count == 1 || leagues.user_pind_count == 1
    );
  }, [leagues]);

  return (
    <button
      disabled={loading}
      className={`${styles.button} ${isPin ? styles.active : ""}`}
      onClick={auth ? onTogglePin : onOpenLogin}
    >
      {<IconPinFavorite />}
    </button>
  );
};
