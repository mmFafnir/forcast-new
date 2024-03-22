"use client";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.premium.module.scss";

import { useEffect, useState } from "react";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeAllModal, setModal } from "@/shared/UI/Modal/modalSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypePrem } from "../../types/TypePrem";
import { getPremium } from "../../api/getPremium";

import { Payment } from "../Payment";
import IconArrowBack from "@/shared/icons/IconArrowBack";

export const ModalPremium = () => {
  const dispatch = useTypeDispatch();
  const { click } = useTypeSelector((state) => state.modal);
  const { auth } = useTypeSelector((state) => state.auth);

  const [data, setData] = useState<TypePrem[] | null>(null);

  const onBackUser = () => dispatch(setModal(EnumModals.SETTINGS));

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
      onCloseCallback={click == "user-mobile" ? onBackUser : undefined}
      iconClose={click == "user-mobile" ? <IconArrowBack /> : null}
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
