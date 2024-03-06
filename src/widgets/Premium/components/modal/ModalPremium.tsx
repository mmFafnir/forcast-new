"use client";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.premium.module.scss";
import Select from "@/shared/UI/Select";
import { Sale } from "../Sale";
import { PromoCode } from "../PromoCode";
import Button from "@/shared/UI/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { TypePrem } from "../../types/TypePrem";
import { getPremium } from "../../api/getPremium";

const values = [
  {
    label: "RUB",
    value: "rub",
  },
  {
    label: "USD",
    value: "usd",
  },
  {
    label: "EU",
    value: "euro",
  },
];

export const getValueSign = (value: string) => {
  if (value === "rub") return "₽";
  if (value === "usd") return "$";
  return "€";
};

export const ModalPremium = () => {
  const { auth } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();

  const [data, setData] = useState<TypePrem[] | null>(null);
  const [currentData, setCurrentData] = useState<TypePrem | null>(null);
  const [promoCode, setPromoCode] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("rub");

  const onOpenPremiumWhy = () => dispatch(setModal(EnumModals.PREMIUM_WHY));

  useEffect(() => {
    if (!auth) return;
    getPremium().then((res) => {
      const data = res.sort((a, b) => {
        return a.id - b.id;
      });
      setData(data);
      setCurrentData(data[0]);
    });
  }, [auth]);

  if (!auth || !data) return;
  return (
    <Modal
      name={EnumModals.PREMIUM}
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      styleContent={{ flex: "0 1 560px", margin: "0 auto", paddingTop: "40px" }}
      styleBody={{ padding: 0 }}
      titleAlight="center"
      hideRender
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
              value={lang}
              setValue={(value) => setLang(String(value.value))}
              data={values}
              styleBody={{ minWidth: "100px" }}
            />
          </div>
        </div>
        <Sale lang={lang} data={data || []} onChange={setCurrentData} />
        <PromoCode
          setPremStatus={setPromoCode}
          bonus={currentData?.bonus_percent || "0"}
          bonusDay={currentData?.bonus_day || "0"}
        />
        <div className={styles.footer}>
          <div className={styles.total}>
            <p>ИТОГО: </p>
            <p>
              <span>{currentData?.name}</span> за{" "}
              <span>
                {currentData &&
                  currentData[
                    promoCode
                      ? (`price_${lang}_with_bonus` as "price_rub_with_bonus")
                      : (`price_${lang}` as "price_rub")
                  ]}
                {getValueSign(lang)}
              </span>
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
