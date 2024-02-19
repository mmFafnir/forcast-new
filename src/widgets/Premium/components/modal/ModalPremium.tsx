"use client";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.premium.module.scss";
import Select from "@/shared/UI/Select";
import { Sale } from "../Sale";
import { PromoCode } from "../PromoCode";
import Button from "@/shared/UI/Button";
import Link from "next/link";
import { useState } from "react";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";

const values = [
  {
    label: "RUB",
    value: "rub",
  },
  {
    label: "USD",
    value: "USD",
  },
  {
    label: "EU",
    value: "EU",
  },
];

export const ModalPremium = () => {
  const dispatch = useTypeDispatch();
  const [day, setDay] = useState<number>(30);

  const onOpenPremiumWhy = () => dispatch(setModal(EnumModals.PREMIUM_WHY));

  return (
    <Modal
      name={EnumModals.PREMIUM}
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      styleContent={{ flex: "0 1 560px", margin: "0 auto", paddingTop: "40px" }}
      styleBody={{ padding: 0 }}
      titleAlight="center"
      title={
        <p className={styles.title}>
          Доступ к <span className={styles.gold}>PREMIUM</span> контенту
        </p>
      }
    >
      <div className={styles.body}>
        <div className={styles.header}>
          <p>
            Что такое <button onClick={onOpenPremiumWhy}>Premium?</button>
          </p>
          <div className={styles.right}>
            <p>Выбери валюту:</p>
            <Select
              value={values[0].value}
              setValue={() => {}}
              data={values}
              styleBody={{ minWidth: "100px" }}
            />
          </div>
        </div>
        <Sale day={day} setDay={setDay} />
        <PromoCode />
        <div className={styles.footer}>
          <div className={styles.total}>
            <p>ИТОГО: </p>
            <p>
              <span>{day}</span> дня за <span>1919</span> руб.
            </p>
          </div>
          <Button className={styles.submit} type="gradient">
            ОПЛАТИТЬ
          </Button>

          <div className={styles.pol}>
            {/* <IconCheck /> */}
            <p>
              Нажимая на кнопку “Оплатить” вы соглашаетесь с{" "}
              <Link href={"/privacy-policy"}>политикой конфиденциальности</Link>
              и
              <Link href={"/privacy-policy"}>пользовательским соглашением</Link>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
