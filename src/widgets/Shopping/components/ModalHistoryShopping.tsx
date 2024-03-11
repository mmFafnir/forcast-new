"use client";
import React from "react";
import styles from "../styles/modal.history.module.scss";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { HistoryTable } from "./table/HistoryTable";
import IconArrowBack from "@/shared/icons/IconArrowBack";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";

export const ModalHistoryShopping = () => {
  const dispatch = useTypeDispatch();
  const onBack = () => dispatch(setModal(EnumModals.SETTINGS));

  return (
    <Modal
      name={EnumModals.SHOPPING_HISTORY}
      stylesWrapper={{ flex: "0 1 100%", height: "100%", paddingTop: "5%" }}
      styleBody={{ padding: 0 }}
      titleAlight="center"
      hideRender
      classContent={styles.modal}
      title={
        <p className={styles.title}>
          <button onClick={onBack}>
            <IconArrowBack />
          </button>
          <span>История покупок</span>
        </p>
      }
    >
      <HistoryTable />
    </Modal>
  );
};
