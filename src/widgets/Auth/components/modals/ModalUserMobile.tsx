"use client";

import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.settings.module.scss";
import Auth from "../Auth";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { logout } from "../../slice/authSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { User } from "../User";
import { OtherSnap } from "../OtherSnap";
import { useState } from "react";
import { TelegramSnap } from "../Snaps/TelegramSnap";
import { addNewEmail } from "../../api/auth";
import { confirmNewEmail } from "../../api/confirm";
import { signOut } from "next-auth/react";
import { closeAllModal } from "@/shared/UI/Modal/modalSlice";

export const ModalUserMobile = () => {
  const { user, webApp } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();

  const [component, setComponent] = useState<string>("mail");

  const onLogout = () => {
    dispatch(closeAllModal());
    dispatch(logout());
    signOut();
  };

  if (!user) return;
  return (
    <Modal
      name={EnumModals.USER_MOBILE}
      title="Личный кабинет"
      titleAlight="center"
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      styleContent={{ flex: "0 1 500px", margin: "0 auto" }}
      classContent="modal-wrapper"
      styleBody={{ padding: 0 }}
    >
      <User />
      <p>Привязать аккаунт</p>
      <OtherSnap component={component} setComponent={setComponent} />
      {component === "mail" && (
        <Auth callbackConfirm={confirmNewEmail} callback={addNewEmail} />
      )}
      {component === "telegram" && <TelegramSnap />}
      {!webApp && (
        <Button onClick={onLogout} className={styles.logout} type="text">
          Выйти
        </Button>
      )}
    </Modal>
  );
};
