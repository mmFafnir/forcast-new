"use client";
import { FC } from "react";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { UserHeader } from "./UserHeader";
import { EnumStatus } from "@/shared/types/Enums";

export const ButtonLogin: FC = () => {
  const { user, status } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();
  const onOpenModal = () => dispatch(setModal(EnumModals.LOGIN));
  return (
    <>
      {user ? (
        <UserHeader />
      ) : (
        <Button
          loading={status === EnumStatus.LOADING}
          width="173px"
          type="gradient"
          onClick={onOpenModal}
        >
          Войти
        </Button>
      )}
    </>
  );
};
