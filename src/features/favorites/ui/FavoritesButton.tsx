"use client";
import Button from "@/shared/UI/Button";
import TotalMatches from "@/shared/UI/TotalMatches";
import styles from "../styles/button.module.scss";
import { IconFavorite } from "../icons/IconFavorite";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

export const FavoritesButton = () => {
  const { favorites } = useTypeSelector((state) => state.favorites);

  return (
    <Button type="text" className={styles.button} href="/favorites">
      <IconFavorite />
      <span>Избранное</span>
      <TotalMatches className={styles.total}>{favorites.length}</TotalMatches>
    </Button>
  );
};
