"use client";
import Button from "@/shared/UI/Button";
import TotalMatches from "@/shared/UI/TotalMatches";
import styles from "../styles/button.module.scss";
import { IconFavorite } from "../icons/IconFavorite";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { FC, use, useEffect } from "react";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setFavorite } from "../slice/favoritesSlice";
import { useRouter } from "next/navigation";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";

interface IProps {
  className?: string;
}

export const FavoritesButton: FC<IProps> = ({ className }) => {
  const navigate = useRouter();
  const { user } = useTypeSelector((state) => state.auth);
  const { favorites } = useTypeSelector((state) => state.favorites);
  const dispatch = useTypeDispatch();

  const goToFavorite = () => navigate.push("/favorites");
  const onOpenModalLogin = () => dispatch(setModal(EnumModals.LOGIN));

  useEffect(() => {
    if (!user) return;
    console.log(user);
    dispatch(setFavorite(user.favorite_count));
  }, [user]);

  return (
    <Button
      type="text"
      style={{ justifyContent: "flex-start" }}
      className={`${styles.button} ${className}`}
      onClick={!user ? onOpenModalLogin : goToFavorite}
    >
      <IconFavorite />
      <span>Избранное</span>
      <TotalMatches className={styles.total}>{favorites.length}</TotalMatches>
    </Button>
  );
};
