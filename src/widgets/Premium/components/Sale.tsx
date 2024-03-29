"use client";
import { FC, memo, useEffect, useState } from "react";
import styles from "../styles/sale.module.scss";
import { Range } from "./ui/Range";
import { TypePrem } from "../types/TypePrem";
import { divideSumByComma } from "@/shared/helper/divideSumByComma";
import { getValueSign } from "./Payment";
import { TypePromoCode } from "../types/IFetchPromoCode";

interface IProps {
  data: TypePrem[];
  onChange: (value: TypePrem) => void;
  lang: string;
  promoCode: TypePromoCode | null;
}
const SaleMemo: FC<IProps> = ({ data, lang, onChange, promoCode }) => {
  const [rate, setRate] = useState<TypePrem>(data[0]);

  useEffect(() => {
    onChange(rate);
  }, [rate]);

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <p>{rate.name}</p>
        <p>
          {divideSumByComma(rate[`day_price_${lang}` as "day_price_rub"])}
          {getValueSign(lang)} / день
        </p>
      </div>
      <div className={styles.content}>
        <Range promoCode={promoCode} setValue={setRate} data={data} />
      </div>
      <div className={styles.footer}>
        <p className={styles.discount}>
          Сэкономлено:
          <span
            style={{
              color:
                rate[`saved_price_${lang}` as "saved_price_rub"] != "0"
                  ? "#84EB88"
                  : "",
            }}
          >
            {" "}
            {divideSumByComma(rate[`saved_price_${lang}` as "saved_price_rub"])}
            {getValueSign(lang)}
          </span>
        </p>
        <p className={styles.sum}>
          {" "}
          {rate[`price_${lang}` as "price_rub"] != "0"
            ? divideSumByComma(rate[`price_${lang}` as "price_rub"]) +
              getValueSign(lang)
            : "Бесплатно"}
          {}
        </p>
      </div>
    </div>
  );
};

export const Sale = memo(SaleMemo);
