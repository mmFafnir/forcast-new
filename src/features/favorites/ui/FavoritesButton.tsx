"use client";
import Button from "@/shared/UI/Button";
import TotalMatches from "@/shared/UI/TotalMatches";
import styles from "../styles/button.module.scss";
import { IconFavorite } from "../icons/IconFavorite";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { FC, useEffect } from "react";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setFavorite } from "../slice/favoritesSlice";

interface IProps {
  className?: string;
}

export const FavoritesButton: FC<IProps> = ({ className }) => {
  const { user } = useTypeSelector((state) => state.auth);
  const { favorites } = useTypeSelector((state) => state.favorites);
  const dispatch = useTypeDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(setFavorite(user.favorite_count));
  }, []);

  if (!user) return <></>;
  return (
    <Button
      type="text"
      className={`${styles.button} ${className}`}
      href="/favorites"
    >
      <IconFavorite />
      <span>Избранное</span>
      <TotalMatches className={styles.total}>{favorites.length}</TotalMatches>
    </Button>
  );
};
