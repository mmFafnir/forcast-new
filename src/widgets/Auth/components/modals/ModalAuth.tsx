"use client";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { closeAllModal } from "@/shared/UI/Modal/modalSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useEffect, useState } from "react";
import { Wrapper } from "../ui/Wrapper";
import { IconCart } from "../../icons/IconCart";
import { OtherRegister } from "../OtherRegister";
import styles from "../../styles/auth.module.scss";
import Auth from "../Auth";
import { Success } from "../ui/Success";

export const ModalAuth = () => {
  const dispatch = useTypeDispatch();
  const onCloseModal = () => dispatch(closeAllModal());
  const { auth } = useTypeSelector((state) => state.auth);

  useEffect(() => {
    onCloseModal();
  }, [auth]);

  return (
    <Modal
      name={EnumModals.LOGIN}
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      styleContent={{ flex: "0 1 500px", margin: "0 auto", paddingTop: "10%" }}
      styleBody={{ padding: 0 }}
      title="Вход или регистрация"
      titleAlight="center"
    >
      <Wrapper>
        {/* {true ? (
          <Success />
        ) : ( */}
        <>
          <div className={styles.cart}>
            <IconCart />
            <p>
              Для продолжения покупки войдите или зарегистрируйтесь, введя свой
              email
            </p>
          </div>
          <OtherRegister />
          <Auth />
        </>
        {/* )} */}
      </Wrapper>
    </Modal>
  );
};
