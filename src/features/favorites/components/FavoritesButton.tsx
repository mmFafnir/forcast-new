"use client";
import Button from "@/shared/UI/Button";
import TotalMatches from "@/shared/UI/TotalMatches";
import styles from "../styles/button.module.scss";
import { IconFavorite } from "../icons/IconFavorite";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { FC, use, useEffect } from "react";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import {
  deleteAllFavorites,
  deleteFavorite,
  setFavorite,
} from "../slice/favoritesSlice";
import { usePathname, useRouter } from "next/navigation";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";

interface IProps {
  className?: string;
}

export const FavoritesButton: FC<IProps> = ({ className }) => {
  const pathname = usePathname();

  const { user } = useTypeSelector((state) => state.auth);
  const { favorites } = useTypeSelector((state) => state.favorites);
  const dispatch = useTypeDispatch();
  const onOpenModalLogin = () => dispatch(setModal(EnumModals.LOGIN));

  useEffect(() => {
    if (!user) {
      dispatch(deleteAllFavorites());
      return;
    }
    dispatch(setFavorite(user.favorite_count));
  }, [user]);

  return (
    <Button
      type="text"
      style={{ justifyContent: "flex-start" }}
      className={`${styles.button} ${className}`}
      onClick={!user ? onOpenModalLogin : () => {}}
      href={user ? "/favorites" : undefined}
      active={pathname === "/favorites"}
    >
      <IconFavorite />
      <span>Избранное</span>
      <TotalMatches className={styles.total}>{favorites.length}</TotalMatches>
    </Button>
  );
};
