"use client";
import { FC } from "react";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";

export const ButtonLogin: FC = () => {
  const dispatch = useTypeDispatch();
  const onOpenModal = () => dispatch(setModal(EnumModals.LOGIN));
  return (
    <>
      <Button width="173px" type="gradient" onClick={onOpenModal}>
        Войти
      </Button>
    </>
  );
};
