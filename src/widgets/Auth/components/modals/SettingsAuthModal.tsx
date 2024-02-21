"use client";

import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.settings.module.scss";
import { OtherRegister } from "../OtherRegister";
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

export const SettingsAuthModal = () => {
  const { user } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();

  const [component, setComponent] = useState<string>("mail");

  const onLogout = () => dispatch(logout());

  if (!user) return;
  return (
    <Modal
      name={EnumModals.SETTINGS}
      title="Настройки аккаунта"
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      styleContent={{ flex: "0 1 500px", margin: "0 auto" }}
      classContent="modal-wrapper"
      styleBody={{ padding: 0 }}
    >
      <User />
      <OtherSnap component={component} setComponent={setComponent} />
      {component === "mail" && (
        <Auth callbackConfirm={confirmNewEmail} callback={addNewEmail} />
      )}
      {component === "telegram" && <TelegramSnap />}
      <Button onClick={onLogout} className={styles.logout} type="text">
        Выйти
      </Button>
    </Modal>
  );
};
