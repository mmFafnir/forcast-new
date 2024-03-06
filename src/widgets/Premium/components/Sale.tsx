"use client";
import { FC, useEffect, useState } from "react";
import styles from "../styles/sale.module.scss";
import { Range } from "./ui/Range";
import { TypePrem } from "../types/TypePrem";
import { getValueSign } from "./modal/ModalPremium";

interface IProps {
  data: TypePrem[];
  onChange: (value: TypePrem) => void;
  lang: string;
}
export const Sale: FC<IProps> = ({ data, lang, onChange }) => {
  const [rate, setRate] = useState<TypePrem>(data[0]);

  useEffect(() => {
    onChange(rate);
  }, [rate]);
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <p>{rate.name}</p>
        <p>
          {rate[`day_price_${lang}` as "day_price_rub"]}
          {getValueSign(lang)} / день
        </p>
      </div>
      <div className={styles.content}>
        <Range setValue={setRate} data={data} />
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
            {rate[`saved_price_${lang}` as "saved_price_rub"]}
            {getValueSign(lang)}
          </span>
        </p>
        <p className={styles.sum}>
          {" "}
          {rate[`price_${lang}` as "price_rub"]}
          {getValueSign(lang)}
        </p>
      </div>
    </div>
  );
};
