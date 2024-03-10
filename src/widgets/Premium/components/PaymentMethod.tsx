"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "../styles/payment.method.module.scss";
import Select from "@/shared/UI/Select";
import { IMethodCategory, IMethodCountry } from "../types/TypePrem";
import Button from "@/shared/UI/Button";
import MyScrollbar from "@/shared/UI/MyScrollbar";

interface IProps {
  country?: IMethodCountry[];
}
export const PaymentMethod: FC<IProps> = ({ country }) => {
  const [currentCountry, setCurrentCountry] = useState<IMethodCountry | null>(
    country && country.length > 0 ? country[0] : null
  );
  const [categories, setCategories] = useState<IMethodCategory[]>([]);
  const [currentCategory, setCurrentCategory] =
    useState<IMethodCategory | null>(null);

  useEffect(() => {
    if (!country) return;
    setCurrentCountry(country[0]);
  }, [country]);

  useEffect(() => {
    setCategories(currentCountry ? currentCountry.category : []);
    setCurrentCategory(currentCountry ? currentCountry.category[0] : null);
  }, [currentCountry]);

  console.log(currentCategory);

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
      <MyScrollbar className="scroll-bottom-no-padding">
        <div className={styles.categories}>
          {categories &&
            categories.map((category) => (
              <Button
                type="gray"
                active={currentCategory?.id === category.id}
                className={styles.btn}
                key={category.id}
              >
                {category.name}
              </Button>
            ))}
        </div>
      </MyScrollbar>
      <div className={styles.payments}>
        {currentCategory?.payment_method.map((payment, index) => (
          <div key={payment.id} className={styles.payment}>
            <input
              type="radio"
              name={"payment"}
              value={payment.payment_id}
              id={String(payment.id)}
              defaultChecked={index === 0}
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
