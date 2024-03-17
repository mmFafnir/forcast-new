"use client";

import Button, { TypeButton } from "@/shared/UI/Button";
import React, { FC, useEffect, useState } from "react";
import { IconFavorite } from "..";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import styles from "../styles/favorite.button.module.scss";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { deleteIdsFavorite, setFavorite } from "../slice/favoritesSlice";
import { addFavorite, deleteFavorite } from "../api/favorite";
import { setClick, setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
interface IProps {
  className?: string;
  ids: number[];
  active: boolean;
  type?: TypeButton;
}
export const FavoriteAdd: FC<IProps> = ({
  className,
  active,
  ids,
  type = "none",
}) => {
  const { auth } = useTypeSelector((state) => state.auth);
  const { favorites } = useTypeSelector((state) => state.favorites);
  const dispatch = useTypeDispatch();
  const [currentActive, setCurrentActive] = useState<boolean>(active);

  const onAddFavorite = () => {
    dispatch(setFavorite(ids));
    setCurrentActive(true);
    addFavorite(ids).catch((err) => {
      dispatch(deleteIdsFavorite(err));
      setCurrentActive(false);
    });
  };

  const onDeleteFavorite = () => {
    const deletedFav = favorites.filter((fav) => {
      return ids.includes(fav);
    });
    dispatch(deleteIdsFavorite(deletedFav));
    setCurrentActive(false);
    deleteFavorite(deletedFav).catch((err) => {
      console.log(err);
      dispatch(setFavorite(err));
      setCurrentActive(true);
    });
  };

  const onOpenLogin = () => {
    dispatch(setClick("favorite"));
    dispatch(setModal(EnumModals.LOGIN));
  };

  useEffect(() => {
    setCurrentActive(active);
  }, [active]);

  useEffect(() => {
    if (ids.length > 1) return;
    console.log("ids", ids);
    if (favorites.find((id) => id === ids[0])) {
      setCurrentActive(true);
    } else {
      setCurrentActive(false);
    }
  }, [favorites]);

  return (
    <Button
      type={type}
      className={`${className} ${currentActive ? styles.active : ""}`}
      onClick={
        auth ? (currentActive ? onDeleteFavorite : onAddFavorite) : onOpenLogin
      }
    >
      <IconFavorite />
    </Button>
  );
};
