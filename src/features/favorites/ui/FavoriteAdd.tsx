"use client";

import Button, { TypeButton } from "@/shared/UI/Button";
import React, { FC } from "react";
import { IconFavorite } from "..";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import styles from "../styles/favorite.button.module.scss";
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

  if (!auth) return;
  return (
    <Button
      type={type}
      className={`${className} ${active ? styles.active : ""}`}
    >
      <IconFavorite />
    </Button>
  );
};
