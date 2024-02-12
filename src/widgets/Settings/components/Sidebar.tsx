"use client";
import { FC } from "react";

import styles from "../styles/sidebar.module.scss";
import { TimezoneAccordion } from "@/features/timezone/ui/TimezoneAccordion";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeAllModal, setModal } from "@/shared/UI/Modal/modalSlice";

export const SidebarSettings: FC = () => {
  const dispatch = useTypeDispatch();
  const { modal } = useTypeSelector((state) => state.modal);
  const onCloseSidebar = () => dispatch(closeAllModal());

  return (
    <>
      <button
        className={`bg-hover  ${
          modal !== EnumModals.SETTINGS_MOBILE && "close"
        }`}
        onClick={onCloseSidebar}
      ></button>
      <div
        className={`${styles.body} ${
          modal === EnumModals.SETTINGS_MOBILE ? styles.active : ""
        }`}
      >
        <div className={styles.wrapper}>
          <TimezoneAccordion />
        </div>
      </div>
    </>
  );
};
