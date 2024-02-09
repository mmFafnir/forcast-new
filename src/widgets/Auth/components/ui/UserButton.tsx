"use client";

import { IconPerson } from "../../icons/IconPerson";
import Button from "@/shared/UI/Button";
import UserModal from "../modals/UserModal";
import { useEffect, useState } from "react";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { closeAllModal, setModal } from "@/shared/UI/Modal/modalSlice";

export const UserButton = () => {
  const { modal } = useTypeSelector((state) => state.modal);
  const dispatch = useTypeDispatch();

  const openModal = () => dispatch(setModal(EnumModals.USER));
  const closeModal = () => dispatch(closeAllModal());

  const onCloseModal = (e: MouseEvent) => {
    console.log(modal);
    if (modal !== EnumModals.USER) return;
    const target = e.target as HTMLElement;
    if (!target.closest(`.user-modal`) && !target.closest(`.user-open-btn`)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", onCloseModal);

    return () => document.removeEventListener("click", onCloseModal);
  }, [modal]);

  return (
    <>
      <Button
        onClick={modal === EnumModals.USER ? closeModal : openModal}
        className="user-open-btn"
        iconButton
        type="text"
      >
        <IconPerson />
      </Button>
      <UserModal open={modal === EnumModals.USER} />
    </>
  );
};
