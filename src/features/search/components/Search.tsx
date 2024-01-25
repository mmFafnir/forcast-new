"use client";

import Button from "@/shared/UI/Button";
import { FC } from "react";
import styles from "../styles/button.module.scss";
import { IconSearch } from "../icons/IconSearch";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";

export const Search: FC = () => {
  const dispatch = useTypeDispatch();
  const onOpenModal = () => dispatch(setModal(EnumModals.SEARCH));

  return (
    <>
      <Button className={styles.body} type="gray" onClick={onOpenModal}>
        <IconSearch />
        <span>Поиск по сайту</span>
      </Button>
    </>
  );
};
