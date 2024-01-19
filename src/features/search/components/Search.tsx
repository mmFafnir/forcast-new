"use client";

import Button from "@/shared/UI/Button";
import { FC, useState } from "react";
import styles from "../styles/button.module.scss";
import { IconSearch } from "../icons/IconSearch";
import Modal from "@/shared/UI/Modal";
import { SearchBlock } from "./SearchBlock";

export const Search: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const onOpenModal = () => setOpen(true);

  return (
    <>
      <Button className={styles.body} type="gray" onClick={onOpenModal}>
        <IconSearch />
        <span>Поиск по сайту</span>
      </Button>

      <Modal
        stylesWrapper={{ flex: "0 1 854px" }}
        open={open}
        setOpen={setOpen}
      >
        <SearchBlock />
      </Modal>
    </>
  );
};
