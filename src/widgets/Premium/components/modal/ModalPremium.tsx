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
import { divideSumByComma } from "@/shared/helper/divideSumByComma";
import { TypePromoCode } from "../../types/IFetchPromoCode";
import { IParamsStartPay, startPayment } from "../../api/startPayment";
import { useRouter } from "next/navigation";

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

const getStartSing = (value: string) => {
  if (value === "rub") return "RUB";
  if (value === "usd") return "USD";
  return "EUR";
};

export const ModalPremium = () => {
  const { auth } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();
  const navigation = useRouter();

  const [data, setData] = useState<TypePrem[] | null>(null);
  const [currentData, setCurrentData] = useState<TypePrem | null>(null);
  const [promoCode, setPromoCode] = useState<TypePromoCode | null>(null);
  const [lang, setLang] = useState<string>("rub");

  const [loading, setLoading] = useState<boolean>(false);

  const onOpenPremiumWhy = () => dispatch(setModal(EnumModals.PREMIUM_WHY));

  const onStartPayment = () => {
    console.log(currentData);
    if (!currentData) return;
    setLoading(true);
    const params: IParamsStartPay = {
      payment_id: 1,
      payment_method_id: 1,
      rate_detail_id: currentData.id,
      currency: getStartSing(lang),
    };
    if (promoCode) params["promo_code_id"] = String(promoCode.id);
    startPayment(params)
      .then((res) => {
        console.log(res);
        if (res.data) {
          navigation.push(res.data);
        }
        if (!res.data && res.end_date) {
          window.location.href = "/payment-success";
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
          free={currentData?.free_or_not}
          setPremStatus={setPromoCode}
          bonus={currentData?.bonus_percent || "0"}
          bonusDay={currentData?.bonus_day || "0"}
        />
        <div className={styles.footer}>
          <div className={styles.total}>
            <p>ИТОГО: </p>
            <p>
              <span>{currentData?.name.replace(/\D/g, "")}</span>{" "}
              {currentData?.name.replace(/\d+/g, "")}
              {currentData &&
                (currentData[
                  promoCode && promoCode.bonus_percent
                    ? (`price_${lang}_with_bonus` as "price_rub_with_bonus")
                    : (`price_${lang}` as "price_rub")
                ] == "0" ||
                (promoCode?.free_tariffe == "1" &&
                  currentData?.free_or_not == "1") ? (
                  <span> бесплатно</span>
                ) : (
                  <>
                    {" "}
                    за{" "}
                    <span>
                      <>
                        {divideSumByComma(
                          currentData[
                            promoCode && promoCode.bonus_percent
                              ? (`price_${lang}_with_bonus` as "price_rub_with_bonus")
                              : (`price_${lang}` as "price_rub")
                          ]
                        )}
                        <small>{getValueSign(lang)}</small>
                      </>
                    </span>
                  </>
                ))}
            </p>
          </div>
          <Button
            loading={loading}
            onClick={onStartPayment}
            className={styles.submit}
            type="gradient"
          >
            ОПЛАТИТЬ
          </Button>

          <div className={styles.pol}>
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
