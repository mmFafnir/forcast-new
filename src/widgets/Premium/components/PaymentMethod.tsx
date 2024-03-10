"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "../styles/payment.method.module.scss";
import Select from "@/shared/UI/Select";
import { IMethodCategory, IMethodCountry } from "../types/TypePrem";
import Button from "@/shared/UI/Button";
import MyScrollbar from "@/shared/UI/MyScrollbar";

interface IProps {
  country?: IMethodCountry[];
  setValue: (value: number | null) => void;
}
export const PaymentMethod: FC<IProps> = ({ country, setValue }) => {
  const [currentCountry, setCurrentCountry] = useState<IMethodCountry | null>(
    country && country.length > 0 ? country[0] : null
  );
  const [categories, setCategories] = useState<IMethodCategory[]>([]);
  const [currentCategory, setCurrentCategory] =
    useState<IMethodCategory | null>(null);

  const [paymentId, setPaymentId] = useState<number | null>(null);

  const createAllCategories = (categories: IMethodCategory[]) => {
    const arr = categories.map((item) => item.payment_method)[0];
    const category: IMethodCategory = {
      id: "all",
      name: "Все",
      payment_method: arr,
    };

    return category;
  };

  useEffect(() => {
    if (!country) return;
    setCurrentCountry(country[0]);
  }, [country]);

  useEffect(() => {
    setCategories(currentCountry ? currentCountry.category : []);
    setCurrentCategory(
      currentCountry ? createAllCategories(currentCountry.category) : null
    );
    setPaymentId(
      currentCountry
        ? currentCountry.category[0].payment_method[0].payment_id
        : null
    );
  }, [currentCountry]);

  useEffect(() => {
    setValue(paymentId);
  }, [paymentId]);

  return (
    <div className={styles.body}>
      {country && country.length > 0 && (
        <Select
          styleBody={{ marginRight: 0 }}
          contentClass={styles.selectList}
          titleClass={styles.selectTitle}
          value={currentCountry?.id || country[0].id}
          setValue={(item) =>
            setCurrentCountry(
              country.find((country) => country.id === item.value) || null
            )
          }
          data={country.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
      )}
      <div className={styles.categories}>
        <MyScrollbar className="scroll-bottom-no-padding">
          <div className={styles.categoriesWrapper}>
            <Button
              type="text"
              active={currentCategory?.id === "all"}
              className={styles.btn}
              onClick={() =>
                setCurrentCategory(createAllCategories(categories))
              }
            >
              Все
            </Button>
            {categories &&
              categories.map((category) => (
                <Button
                  type="text"
                  active={currentCategory?.id === category.id}
                  className={styles.btn}
                  key={category.id}
                  onClick={() => setCurrentCategory(category)}
                >
                  {category.name}
                </Button>
              ))}
          </div>
        </MyScrollbar>
      </div>
      <div className={styles.payments}>
        {currentCategory?.payment_method.map((payment, index) => (
          <div key={payment.id} className={styles.payment}>
            <input
              type="radio"
              name={"payment"}
              value={payment.pay_type_id}
              id={String(payment.id)}
              defaultChecked={index === 0}
              onChange={(e) => {
                setPaymentId(Number((e.target as HTMLInputElement).value));
              }}
              hidden
            />
            <label htmlFor={String(payment.id)}>
              <span></span>
              <p>
                {payment.parent_kassa.name} {payment.type_name.name_ru}
              </p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
