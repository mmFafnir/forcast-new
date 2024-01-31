"use client";

import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.premium.module.scss";
import { SelectSale } from "../ui/SelectSale";

export const ModalPremium = () => {
  return (
    <Modal
      name={EnumModals.PREMIUM}
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      styleContent={{ flex: "0 1 500px", margin: "0 auto", paddingTop: "10%" }}
      styleBody={{ padding: 0 }}
      title={
        <>
          Доступ к <span>PREMIUM</span> контенту
        </>
      }
    >
      <div className={styles.body}>
        <div className={styles.header}>
          <p>
            Что такое <button>Premium?</button>
          </p>
          <div className="flex item-center">
            <p>Выбери валюту:</p>
            <SelectSale />
          </div>
        </div>
      </div>
    </Modal>
  );
};
