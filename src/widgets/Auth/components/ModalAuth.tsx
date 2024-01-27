"use client";
import Modal from "@/shared/UI/Modal";
import { Wrapper } from "./ui/Wrapper";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeAllModal } from "@/shared/UI/Modal/modalSlice";
import styles from "../styles/auth.module.scss";
import IconX from "@/shared/icons/IconX";
import { Login } from "./Login";
import { Registration } from "./Registration";
import { useEffect, useState } from "react";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

export const ModalAuth = () => {
  const dispatch = useTypeDispatch();
  const [login, setLogin] = useState<boolean>(true);

  const onCloseModal = () => dispatch(closeAllModal());
  const openRegister = () => setLogin(false);
  const openLogin = () => setLogin(true);

  const { auth } = useTypeSelector((state) => state.auth);

  useEffect(() => {
    onCloseModal();
  }, [auth]);

  return (
    <Modal name={EnumModals.LOGIN} stylesWrapper={{ flex: "0 1 319px" }}>
      <Wrapper>
        <button
          className={`modal-close ${styles.close}`}
          onClick={onCloseModal}
        >
          <IconX />
        </button>
        {login ? <Login /> : <Registration />}
        <button
          onClick={login ? openRegister : openLogin}
          className={styles.btn}
        >
          {login ? "Зарегестрироваться" : "Войти"}
        </button>
      </Wrapper>
    </Modal>
  );
};
