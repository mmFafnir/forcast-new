"use client";
import { FC } from "react";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { UserHeader } from "./UserHeader";

export const ButtonLogin: FC = () => {
  const { user } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();
  const onOpenModal = () => dispatch(setModal(EnumModals.LOGIN));
  console.log(user);
  return (
    <>
      {user ? (
        <UserHeader />
      ) : (
        <Button width="173px" type="gradient" onClick={onOpenModal}>
          Войти
        </Button>
      )}
    </>
  );
};
