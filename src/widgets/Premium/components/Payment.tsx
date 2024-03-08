import React, { FC, useEffect, useState } from "react";
import { divideSumByComma } from "@/shared/helper/divideSumByComma";
import { TypePromoCode } from "../types/IFetchPromoCode";
import { IParamsStartPay, startPayment } from "../api/startPayment";
import Select from "@/shared/UI/Select";
import { Sale } from "./Sale";
import { PromoCode } from "./PromoCode";
import Button from "@/shared/UI/Button";
import Link from "next/link";
import { TypePrem } from "../types/TypePrem";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { closeAllModal, setModal } from "@/shared/UI/Modal/modalSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useRouter } from "next/navigation";
import styles from "../styles/modal.premium.module.scss";

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

const getConvertDay = (day: number) => {
  const num = day <= 10 ? day : Number(String(day)[String(day).length - 1]);
  console.log("num", num);
  if (num == 0) return "дней";
  if (num == 1) return "день";
  if (num <= 4 && num < 5) return "дня";
  return "дней";
};

interface IProps {
  data: TypePrem[] | null;
}
export const Payment: FC<IProps> = ({ data }) => {
  const dispatch = useTypeDispatch();
  const navigation = useRouter();

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
    if (!data) {
      dispatch(closeAllModal());
      return;
    }
    setCurrentData(data[0]);
  }, [data]);

  if (!data) return;
  return (
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
            <span>
              {(Number(currentData?.name.replace(/\D/g, "")) || 0) +
                (promoCode?.bonus_day == "1"
                  ? Number(currentData?.bonus_day) || 0
                  : 0)}
            </span>{" "}
            {getConvertDay(
              (Number(currentData?.name.replace(/\D/g, "")) || 0) +
                (promoCode?.bonus_day == "1"
                  ? Number(currentData?.bonus_day) || 0
                  : 0)
            )}
            {currentData &&
              (currentData[
                promoCode &&
                promoCode.bonus_percent == "1" &&
                currentData.bonus_percent
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
                          promoCode &&
                          promoCode.bonus_percent == "1" &&
                          currentData.bonus_percent
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
            <Link href={"/privacy-policy"}>политикой конфиденциальности</Link>и
            <Link href={"/privacy-policy"}>пользовательским соглашением</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
