"use client";

import { IconPerson } from "../../icons/IconPerson";
import Button from "@/shared/UI/Button";
import UserModal from "../modals/UserModal";
import { useEffect, useState } from "react";

export const UserButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const onCloseModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.user-modal`) && !target.closest(`.user-open-btn`)) {
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
        className="user-open-btn"
        iconButton
        type="text"
      >
        <IconPerson />
      </Button>
      <UserModal open={isModalOpen} />
    </>
  );
};
