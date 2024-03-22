"use client";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.premium.module.scss";

import { useEffect, useState } from "react";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeAllModal } from "@/shared/UI/Modal/modalSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypePrem } from "../../types/TypePrem";
import { getPremium } from "../../api/getPremium";

import { Payment } from "../Payment";

export const ModalPremium = () => {
  const { auth } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();

  const [data, setData] = useState<TypePrem[] | null>(null);

  useEffect(() => {
    if (!auth) return;
    getPremium().then((res) => {
      const data = res.sort((a, b) => {
        return a.id - b.id;
      });
      setData(data);
    });
  }, [auth]);

  if (!auth) return;
  return (
    <Modal
      name={EnumModals.PREMIUM}
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      // styleContent={{ }}
      styleBody={{ padding: 0 }}
      titleAlight="center"
      hideRender
      classHeader={styles.titleHeader}
      classContent={styles.modal}
      title={
        <p className={styles.title}>
          Доступ к <span className={styles.gold}>PREMIUM</span> контенту
        </p>
      }
    >
      <Payment data={data} />
    </Modal>
  );
};
