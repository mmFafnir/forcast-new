"use client";
import { FC, useEffect, useState } from "react";
import { IconBell } from "../../icons/IconBell";
import styles from "../../styles/button.notify.module.scss";
import Button from "@/shared/UI/Button";
import { NotifyModal } from "../modals/NotifyModal";

export const NotifyButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const onCloseModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(`.notify-modal`) &&
        !target.closest(`.${styles.body}`)
      ) {
        closeModal();
      }
    };
    document.addEventListener("click", onCloseModal);

    return () => document.removeEventListener("click", onCloseModal);
  }, []);

  return (
    <>
      <Button
        onClick={isModalOpen ? closeModal : openModal}
        iconButton={true}
        type="text"
        className={styles.body}
      >
        <p>
          <span>21</span>
        </p>
        <IconBell />
      </Button>
      <NotifyModal open={isModalOpen} />
    </>
  );
};
